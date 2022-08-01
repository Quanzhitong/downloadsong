const program = require('commander');
const updateNotifier = require('update-notifier'); // 检测包更新
const pkg = require('../package.json');
const commander = require('commander')
const colors = require('colorette')

module.exports = (() => {
    updateNotifier({ pkg }).notify();

    commander.name('downloadSong or dls').usage('<text>').version(pkg.version)

    commander.on('--help', () => {
      console.log('')
      console.log(colors.gray('Examples:'))
      console.log(colors.cyan('  $ ') + 'downloadSong 许嵩')
      console.log(colors.cyan('  # ') + 'or')
      console.log(colors.cyan('  $ ') + 'dls 许嵩')
      console.log('')
    })
  
    commander.parse(process.argv)
  
    return commander.args.join(' ')
})()
    