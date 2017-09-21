const Q = require("q");
const defer = Q.defer();

function getInitialPromise() {
  return defer.promise;
}

// getInitialPromise().then(
//   success => {
//     console.log(success);
//   },
//   error => {
//     console.log(error);
//   },
//   progress => {
//     console.log(progress);
//   }
// );

// defer.notify("in progress");
// defer.resolve("resolve");
// defer.reject("reject");

const outputPromise = getInitialPromise().then((fulfilled) => {
    return 'fulfilled'
}, (rejected) => {
    return 'rejected'
})

outputPromise.then((fulfilled)=> {
    console.log('fulfilled: ' + fulfilled)
}, (rejected) => {
    console.log('rejectd: ' + rejected)
})

// defer.reject()

defer.resolve()
