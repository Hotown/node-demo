const express = require("express");
const cheerio = require("cheerio");
const superagent = require("superagent");

const app = express();

app.get("/", function(req, res, next) {
  superagent.get("https://cnodejs.org/").end(function(err, sres) {
    if (err) {
      return next(err);
    }
    const $ = cheerio.load(sres.text);
    const items = [];
    $("#topic_list .topic_title").each(function(idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr("title"),
        href: $element.attr("href")
      });
    });

    res.send(items);
  });
});

app.listen(3000, function() {
  console.log("app is listening at port 3000");
});
