const cliProgress = require('cli-progress')
const colors = require('colorette')
const fs = require('fs')
const https = require('https')
const http = require('http')
const request = require('request');
const got = require('got')

const path = require('path')

module.exports = async ({ name, id }) => {

  const detailUrl = `https://music.163.com/api/song/enhance/player/url?id=${id}&ids=[${id}]&br=3200000`;

  const { body } = await got(detailUrl);
  
  const { url } = JSON.parse(body).data[0];

  const progress = new cliProgress.SingleBar({
    format: '下载进度 | {bar} | {percentage}%',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  })

  console.log(colors.green('文件下载开始...'))

  const request = url.startsWith('https://') ? https : http;

  const extension = url.split('.').pop();

  request.get(url, (res) => {

    const fileSteam = fs.createWriteStream(`${name}.${extension}`)

    res.pipe(fileSteam)

    progress.start(res.headers['content-length'], 0)

    let dataLength = 0

    res.on('data', (chunk) => {
      dataLength += chunk.length
      progress.update(dataLength)
    })

    fileSteam.on('finish', () => {
      progress.stop()
      console.log(colors.green('文件下载完成'))
      fileSteam.end()
      process.exit(0)
    })
  })
  
}
