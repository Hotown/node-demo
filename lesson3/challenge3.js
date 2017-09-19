/**
 * 单路爬虫
 */
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
    $("#topic_list .cell").each(function(idx, element) {
      const $element = $(element);
      items.push({
        title: $element
          .children(".topic_title_wrapper")
          .children(".topic_title")
          .attr("title"),
        href: $element
          .children(".topic_title_wrapper")
          .children(".topic_title")
          .attr("href"),
        author: $element
          .children(".user_avatar")
          .children()
          .attr("title")
      });
    });
    res.send(items);
  });
});
