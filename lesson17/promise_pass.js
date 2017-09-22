const Q = require("q");
const defer = Q.defer();

function getInitialPromise() {
  return defer.promise;
}

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