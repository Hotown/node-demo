const Q = require("q");
const defer = Q.defer();

function getInitialPromise() {
  return defer.promise;
}

getInitialPromise().then(
  success => {
    console.log(success);
  },
  error => {
    console.log(error);
  },
  progress => {
    console.log(progress);
  }
);

defer.notify("in progress");
defer.resolve("resolve");
defer.reject("reject");