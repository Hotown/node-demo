const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = new express();
// app.use(cookieParser())

// app.get('/', function(req, res) {
//     if (req.cookies.isVisit) {
//         console.log(req.cookies);
//         res.send("再次欢迎访问");
//       } else {
//         res.cookie('isVisit', 1, {maxAge: 60 * 1000});
//         res.send("欢迎第一次访问");
//       }
// })
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "recommand 128 bytes random string",
    cookie: { maxAge: 60 * 1000 }
  })
);

app.get("/", function(req, res) {
  if (req.session.isVisit) {
    req.session.isVisit++;
    res.send("<p>第 " + req.session.isVisit + " 次来此页面</p>");
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
});

app.listen(3000);
