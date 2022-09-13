import got from 'got';
import { green, red } from 'colorette';

const querySongList = async (cliArr: string[]) => {
    let text = cliArr[0];
    let server = cliArr[1] || 'kuwo';
    if (text === '') {
        console.error(green(`请输入歌曲名称或歌手名字`));
        process.exit(1);
    }

    let searchUrl = '';
    let searchSongs = [];

    if (server === 'kuwo') {
        
        // all=需要搜索的歌曲或歌手
        // pn（pageNum）=查询的页码数, 应该是倒序排的
        // rn（responstNum）=当前页的返回数量
        searchUrl = `http://search.kuwo.cn/r.s?all=${encodeURIComponent(text)}&ft=music&client=kt&vipver=1&rn=20&rformat=json&encoding=utf8`;

        const { body } = await got(searchUrl);

        // 外“” 内'' 的json，不能使用JSON.parse
        const _body = (new Function("return " + body))();
        const { abslist } = _body;
        const MUSICRID_MAP = abslist.map(item => item.MUSICRID);
        searchSongs = abslist.map((item) => {
            return {
                id: item.DC_TARGETID,
                name: item.NAME,
                artists: [{ name: item.ARTIST }],
                server: server
            };
        });

        if (abslist.length === 0) {
            console.error(red(`没搜索到 ${text} 的相关结果`));
            process.exit(1);
        }

    } else {
        // 网易云
        searchUrl = `https://music.163.com/api/search/get/web?s=${encodeURIComponent(
            text
        )}&type=1&limit=20&offset=20`;

        const { body } = await got(searchUrl);

        //   fee: enum,
        //   0: 免费或无版权
        //   1: VIP 歌曲
        //   4: 购买专辑
        //   8: 非会员可免费播放低音质，会员可播放高音质及下载
        //   fee 为 1 或 8 的歌曲均可单独购买 2 元单曲

        const { result: { songs = [], songCount } } = JSON.parse(body);
        searchSongs = songs.filter((item: { fee: number; }) => item.fee !== 1);
        for (const song of searchSongs) {
            const detailUrl = `https://music.163.com/api/song/enhance/player/url?id=${song.id}&ids=[${song.id}]&br=3200000`;
            const { body } = await got(detailUrl);
            const { data } = JSON.parse(body);
            const { url, size, type } = data[0];
            Object.assign(song, { url, size, extension: type });
        }

        if (songs.length === 0) {
            console.error(red(`没搜索到 ${text} 的相关结果`));
            process.exit(1);
        }
    }

    return searchSongs;
};

export default querySongList;