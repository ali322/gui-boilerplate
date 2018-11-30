const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { watch } = require('chokidar')
const { mainPath, mainEntry, rendererPath} = require('../config/base')
const rendererConfig = require('./webpack.dev')

let electronProcess = null
let manualRestart = false
let hotMiddleware
let watcher

function logStats (proc, data) {
  let log = ''

  log += chalk.yellow.bold(
    `┏ ${proc} Process ${new Array(19 - proc.length + 1).join('-')}`
  )
  log += '\n\n'

  if (typeof data === 'object') {
    data
      .toString({
        colors: true,
        chunks: false
      })
      .split(/\r?\n/)
      .forEach(line => {
        log += '  ' + line + '\n'
      })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

  console.log(log)
}

function startRenderer () {
  return new Promise((resolve, reject) => {
    const compiler = webpack(rendererConfig)
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })

    compiler.hooks.compilation.tap('dev.runner', compilation => {
      hotMiddleware.publish({ action: 'reload' })
    })

    compiler.hooks.done.tap('dev.runner', stats => {
      logStats('Renderer', stats)
    })

    const server = new WebpackDevServer(compiler, {
      contentBase: rendererPath,
      // hot: true,
      publicPath: '/hmr/',
      quiet: true,
      before (app, ctx) {
        app.use(hotMiddleware)
        ctx.middleware.waitUntilValid(() => {
          resolve()
        })
      }
    })

    server.listen(8080)
  })
}

function startElectron () {
  electronProcess = spawn(electron, [mainEntry, '--inspect=5858', '.'])

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function electronLog (data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
        '\n\n' +
        log +
        chalk[color].bold('┗ ----------------------------') +
        '\n'
    )
  }
}

function watchMain () {
  watcher = watch(mainPath, {
    // eslint-disable-next-line
    ignored: /(^|[\/\\])\../,
    persistent: true
  })
  const onChange = () => {
    if (electronProcess && electronProcess.kill) {
      manualRestart = true
      process.kill(electronProcess.pid)
      electronProcess = null
      startElectron()

      setTimeout(() => {
        manualRestart = false
      }, 5000)
    }
  }
  watcher.on('add', onChange)
  watcher.on('change', onChange)
  watcher.on('unlink', onChange)

  // process.once('exit', watcher.close)
  // process.once('SIGINT', watcher.close)
}

function init () {
  startRenderer().then(() => {
    startElectron()
    watchMain()
  }).catch(err => {
    console.error(err)
  })
}

init()
