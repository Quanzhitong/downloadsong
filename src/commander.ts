import updateNotifier from 'update-notifier'; // 检测包更新
import pkg from '../package.json';
import { Command } from 'commander';
import { gray, cyan } from 'colorette';

const program = new Command();

const commanderCLI = (() => {
    updateNotifier({ pkg }).notify();

    program.name('downloadSong or dls').usage('<text>').version(pkg.version)

    program.on('--help', () => {
      console.log('')
      console.log(gray('Examples:'))
      console.log(cyan('  $ ') + 'downloadSong 许嵩')
      console.log(cyan('  # ') + 'or')
      console.log(cyan('  $ ') + 'dls 许嵩')
      console.log('')
    })
  
    program.parse(process.argv)
  
    return program.args.join(' ')
})()
    
export default commanderCLI