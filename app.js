// const express = require("express");
// const cheerio = require("cheerio");
// const superagent = require("superagent");

// const app = express();

// app.get("/", function(req, res, next) {
//     superagent.get("https://cnodejs.org/").end(function(err, sres) {
//       if (err) {
//         return next(err);
//       }
//       const $ = cheerio.load(sres.text);
//       const items = [];
//       $("#topic_list .cell").each(function(idx, element) {
//         const $element = $(element);
//         items.push({ title: $element
//             .children(".topic_title_wrapper")
//             .children(".topic_title")
//             .attr("title"), href: $element
//             .children(".topic_title_wrapper")
//             .children(".topic_title")
//             .attr("href"), author: $element
//             .children(".user_avatar")
//             .children()
//             .attr("title") });
//       });
//       res.send(items);
//     });
// });

// app.listen(3000, function() {
//   console.log("app is listening at port 3000");
// });

/**
 * 并发爬虫
 */
const eventproxy = require("eventproxy");
const superagent = require("superagent");
const cheerio = require("cheerio");
const url = require("url");

const cnodeUrl = "https://cnodejs.org/";

superagent.get(cnodeUrl).end(function(err, res) {
  if (err) {
    return console.error(err);
  }
  let topicUrls = [];
  const $ = cheerio.load(res.text);
  $("#topic_list .topic_title").each(function(idx, element) {
    var $element = $(element);
    var href = url.resolve(cnodeUrl, $element.attr("href"));
    topicUrls.push(href);
  });

  topicUrls = topicUrls.slice(0, 4);

  //   console.log(topicUrls);

  const ep = new eventproxy();
  let receiver = [];

  const userUrls = [];
  ep.after("topic_html", topicUrls.length, function(topics) {
    topics = topics.map(function(topicPair) {
      const topicUrl = topicPair[0];
      const topicHtml = topicPair[1];
      const $ = cheerio.load(topicHtml);
      const userUrl =
        "https://cnodejs.org" + $(".author_content .user_avatar").attr("href");
      userUrls.push(userUrl);

      receiver.push({
        title: $(".topic_full_title")
          .text()
          .trim(),
        href: topicUrl,
        commit1: $(".reply_content")
          .eq(0)
          .text()
          .trim(),
        author1: $(".author_content .user_avatar")
          .children()
          .attr("title")
      });
    });
    console.log("final: ");
    console.log(userUrls);
    // ep.emit("tinfo");
  });

  ep.all("score", "tinfo", function(score, tinfo) {
    console.log(receiver);
  });

  topicUrls.forEach(function(topicUrl) {
    superagent.get(topicUrl).end(function(err, res) {
      console.log("fetch " + topicUrl + " successful");
      ep.emit("topic_html", [topicUrl, res.text]);
    });
  });
});

//   superagent.get(userUrl).end(function(err, sres) {
//     const userRoot = cheerio.load(sres.text);
//     receiver.push({
//       score: userRoot(".user_profile .unstyled ")
//         .children(".big")
//         .text()
//     });
//     ep.emit("score", receiver);
//   });

// var eventproxy = require('eventproxy');
// var superagent = require('superagent');
// var cheerio = require('cheerio');
// var url = require('url');

// var cnodeUrl = 'https://cnodejs.org/';

// superagent.get(cnodeUrl)
//   .end(function (err, res) {
//     if (err) {
//       return console.error(err);
//     }
//     var topicUrls = [];
//     var $ = cheerio.load(res.text);
//     $('#topic_list .topic_title').each(function (idx, element) {
//       var $element = $(element);
//       var href = url.resolve(cnodeUrl, $element.attr('href'));
//       topicUrls.push(href);
//     });

//     var ep = new eventproxy();

//     ep.after('topic_html', 1, function (topics) {
//       topics = topics.map(function (topicPair) {
//         var topicUrl = topicPair[0];
//         var topicHtml = topicPair[1];
//         var $ = cheerio.load(topicHtml);
//         return ({
//           title: $('.topic_full_title').text().trim(),
//           href: topicUrl,
//           comment1: $('.reply_content').eq(0).text().trim(),
//         });
//       });

//       console.log('final:');
//       console.log(topics);
//     });

//     topicUrls.forEach(function (topicUrl) {
//       superagent.get(topicUrl)
//         .end(function (err, res) {
//           console.log('fetch ' + topicUrl + ' successful');
//           ep.emit('topic_html', [topicUrl, res.text]);
//         });
//     });
//   });
