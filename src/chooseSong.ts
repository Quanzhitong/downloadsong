import prompts from 'prompts'
import { songType } from '../type/songsType';
import names from './names'

const chooseSong = async (songs: songType[] ) =>
  await prompts([
    {
      type: 'select',
      name: 'song',
      message: '共有 ' + songs.length + ' 个结果, 按下空格或回车下载',
      choices: songs.map((s, index) => names(s, index)),
    },
  ])

  export default chooseSong;