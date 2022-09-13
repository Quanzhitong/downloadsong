import { DownloadPropsType } from '../type/downloadType'
import cliProgress from 'cli-progress'
import {green} from 'colorette'
import fs from 'fs'
import https from 'https'
import http from 'http'
import got from 'got'

const download = async ({ name, id, server }: DownloadPropsType) => {

  let detailUrl = '';
  
  if(server === 'kuwo') {
    detailUrl = `https://www.kuwo.cn/api/v1/www/music/playUrl?mid=${id}&type=1`;
  } else {
    detailUrl = `https://music.163.com/api/song/enhance/player/url?id=${id}&ids=[${id}]&br=3200000`;
  }

  const { body } = await got(detailUrl);

  const { url } = server === 'kuwo' ? JSON.parse(body).data : JSON.parse(body).data[0];
  
  const progress = new cliProgress.SingleBar({
    format: '下载进度 | {bar} | {percentage}%',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  })

  console.log(green('文件下载开始...'))

  const request = url.startsWith('https://') ? https : http;

  const extension = url.split('.').pop();

  request.get(url, (res) => {

    const fileSteam = fs.createWriteStream(`${name}.${extension}`)

    res.pipe(fileSteam)

    progress.start(Number(res.headers['content-length']), 0)

    let dataLength = 0

    res.on('data', (chunk) => {
      dataLength += chunk.length
      progress.update(dataLength)
    })

    fileSteam.on('finish', () => {
      progress.stop()
      console.log(green('文件下载完成'))
      fileSteam.end()
      process.exit(0)
    })
  })
}

export default download;