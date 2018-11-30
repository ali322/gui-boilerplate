process.env.NODE_ENV = 'production'

const packager = require('electron-packager')
const path = require('path')
const chalk = require('chalk')

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
// const okayLog = chalk.bgBlue.white(' OKAY ') + ' '

const buildConf = {
  arch: process.env.BUILD_TARGET === 'win32' ? 'ia32' : 'x64',
  asar: true,
  dir: path.join(__dirname, '../'),
  icon: path.join(__dirname, '../icons/aid'),
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, '../output'),
  overwrite: true,
  platform: process.env.BUILD_TARGET || 'all'
}

function pack() {
  packager(buildConf, (err, appPaths) => {
    if (err) {
      console.log(`\n${errorLog}${chalk.yellow('`electron-packager`')} says...\n`)
      console.log(err + '\n')
    } else {
      console.log(`\n${doneLog}\n`)
    }
  })
}

pack()
