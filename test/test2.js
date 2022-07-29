var fs = require('fs');
var axios = require('axios');
var request = require('request');
var https = require('https');
var path = require('path');
var ProgressBar = require('./progress-bar');

const currentPath = (p) => path.join(__dirname, p);

function downloadFile(file_url, targetPath, cb) {
    var received_bytes = 0;
    var total_bytes = 0;
    var beginData = new Date().getTime()
    var out = fs.createWriteStream(`./music/${targetPath.replace(new RegExp( '/' , "g" ),'')}.flac`);
    var writeStream = fs.createWriteStream((currentPath('../request_output.js')));
    // https.get(file_url, (res) => {
    //     console.log(res, '===res====');
    //     res.pipe(out);

    //     res.on('response', data => {
    //         console.log('response=---response');
    //         total_bytes = parseInt(data.headers['content-length']);
    //     });
    //     res.on('data', chunk => {
    //         console.log('datatatata');
    //         console.log(chunk, '==chunk');
    //         received_bytes += chunk.length;
    //         showProgress(received_bytes, total_bytes);
    //     });
    //     res.on('end', _ => {
    //         var endData = new Date().getTime()
    //         var elaTime = (endData - beginData) / 1000
    //         console.log("\n\n下载成功 | 耗时: " + elaTime + "s", (total_bytes / 1000000).toFixed(1) + 'm |', targetPath + '.mp3');
    //         cb()
    //     });
    // })

    var req = request({
        method: 'GET',
        uri: file_url
    });
    req.pipe(writeStream)
    req.pipe(out);

    req.on('response', data => {
        total_bytes = parseInt(data.headers['content-length']);
    });

    req.on('data', chunk => {
        received_bytes += chunk.length;
        showProgress(received_bytes, total_bytes);
    });

    req.on('end', _ => {
        var endData = new Date().getTime()
        var elaTime = (endData - beginData) / 1000
        console.log("\n\n下载成功 | 耗时: " + elaTime + "s", (total_bytes / 1000000).toFixed(1) + 'm |', targetPath + '.mp3');
        cb()
    });
}

function showProgress(received, _total) {
    var percentage = (received * 100) / _total;
    var pb = new ProgressBar('下载进度', 40);
    var num = percentage.toFixed(0),
        total = 100;
    pb.render({
        completed: num,
        total: total,
        _received: (received / 1000000).toFixed(1),
        _total: (_total / 1000000).toFixed(1) + 'm'
    });
}

downloadFile("https://music.163.com/song/media/outer/url?id=1901371647.mp3", 'test', _ => {}) //test
// downloadFile("https://freetyst.nf.migu.cn//public/product9th/product45/2021/12/3120/2016%E5%B9%B406%E6%9C%8824%E6%97%A512%E7%82%B901%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E7%BA%B5%E6%A8%AA%E4%B8%96%E4%BB%A38%E9%A6%96/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/flac/60054704028201411.flac", 'test', _ => {}) //test