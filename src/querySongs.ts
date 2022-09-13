import got from 'got';
import { green, red } from 'colorette';

const querySongs = async (text: string) => {
  if (text === '') {
    console.error(green(`请输入歌曲名称或歌手名字`))
    process.exit(1)
  }

// 网易云
const searchUrl = `https://music.163.com/api/search/get/web?s=${encodeURIComponent(
    text
  )}&type=1&limit=20&offset=20`;
  const { body } = await got(searchUrl);
  
//   fee: enum,
//   0: 免费或无版权
//   1: VIP 歌曲
//   4: 购买专辑
//   8: 非会员可免费播放低音质，会员可播放高音质及下载
//   fee 为 1 或 8 的歌曲均可单独购买 2 元单曲

  const { result: {songs = [], songCount} } = JSON.parse(body);
  const searchSongs = songs.filter((item: { fee: number }) => item.fee !== 1);
  for (const song of searchSongs) {
    const detailUrl = `https://music.163.com/api/song/enhance/player/url?id=${song.id}&ids=[${song.id}]&br=3200000`
    const { body } = await got(detailUrl);
    const { data } = JSON.parse(body);
    const { url, size, type } = data[0];
    Object.assign(song, { url, size, extension: type });
  }
  
  if (!songs) {
    console.error(red(`没搜索到 ${text} 的相关结果`))
    process.exit(1)
  }
  return searchSongs
}

export default querySongs;