import updateNotifier from 'update-notifier'; // 检测包更新
import pkg from '../package.json';
import { Command } from 'commander';
import { gray, cyan, yellow, cyanBright } from 'colorette';

const program = new Command();

const commanderCLI = (() => {
    updateNotifier({ pkg }).notify();

    program.name('downloadSong or dls').usage('<text>').version(pkg.version)

    program.option('-s, --server', '指定下载源，可以是酷我("kuwo")或者网易云("wangyi"), 默认酷我')

    program.on('--help', () => {
      console.log('')
      console.log(cyanBright('Examples:'))
      console.log(yellow('下载:'))
      console.log(cyan('  $ ') + 'downloadSong 许嵩')
      console.log(cyan('  # ') + 'or')
      console.log(cyan('  $ ') + 'dls 许嵩')
      console.log('')
      console.log(yellow('指定下载源:'))
      console.log(cyan('  $ ') + 'dls 周杰伦 -s kuwo')
      console.log(cyan('  $ ') + 'downloadSong 薛之谦 --server wangyi')
    })
    
    program.parse(process.argv)
    
    return program.args
})()
    
export default commanderCLI