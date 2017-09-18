const async = require('async')

const urls = []
for(let i = 0; i < 30; i ++) {
    // 伪造的url
    urls.push('http://datasource_' + i)
}

let concurrencyCount = 0
const fetchUrl = function(url, callback) {
    // 伪造耗时
    const delay = parseInt((Math.random() * 10000000) % 2000, 10)
    concurrencyCount ++ 
    console.log('现在的并发是', concurrencyCount, ', 正在抓取的是', url, ', 耗时' + delay + '耗时')
    setTimeout(function() {
        concurrencyCount --
        callback(null, url + ' html content')
    }, delay)
}

async.mapLimit(urls, 5, function(url, callback) {
    fetchUrl(url, callback)
}, function(err, result) {
    console.log('final: ')
    console.log(result)
})