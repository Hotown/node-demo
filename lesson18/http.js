const http = require("http");

const server = http.createServer(requestHandler);

const users = [{ id: 1, name: "Hotown" }];

function parseBody(req, callback) {
  // 从req中解析body
  callback(null, body);
}

function checkIdInDatabase(body, callback) {
  // 根据body.id在Database中查询，返回结果
  let user;
  users.forEach(user => {});
  callback(null, user);
}

function returnResult(dbResult, res) {
  if (dbResult && dbResult.length > 0) {
    res.end("true");
  } else {
    res.end("false");
  }
}

function requestHandler(req, res) {
  parseBody(req, (err, body) => {
    checkIdInDatabase(body, (err, dbResult) => {
      returnResult(dbResult, res);
    });
  });
}
server.listen(3000);
