const Q = require("q");
const defer = Q.defer();

// 模拟数据库
const users = [{ name: "Hotown", passwd: "password" }];

function getUsername() {
  return defer.promise;
}

function getUser(username) {
  let user;
  users.forEach(element => {
    if (element.name === username) {
      user = element;
    }
  });
  return user;
}

function printUser(user) {
    console.log(user)
}

// 手动链接
// getUsername()
//   .then(username => {
//     return getUser(username)
//   })
//   .then(user => {
//     printUser(user)
//   })
//   .done();

// 动态链接
const funcs = [getUser, printUser]
let result = getUsername()
// funcs.forEach(func => {
//     result = result.then(func)
// })

// 精简后的动态链接
funcs.reduce((prev, current) => {
    return prev.then(current)
}, result)

defer.resolve("Hotown");
