const { BrowserWindow } = require('electron')
const { join, posix } = require('path')
// import { merge, find } from 'lodash'
const { format } = require('url')
// import attachUpdater from './updater'

// exports.opendedWindow = (): string[] => {
//   let allWins = BrowserWindow.getAllWindows()
//   let opened = allWins.map((v: any) => {
//     let url = new URL(v.webContents.getURL())
//     return url.pathname.split(posix.sep).slice(-2, -1)[0]
//   })
//   return opened
// }

// export function getWindow(key: string): Electron.BrowserWindow | undefined {
//   let allWins = BrowserWindow.getAllWindows()
//   return find(allWins, v => {
//     let url = new URL(v.webContents.getURL())
//     return url.pathname.split(posix.sep).slice(-2, -1)[0] === key
//   })
// }

function createWindow(
  path,
  options
) {
  let defaults = {
    width: 1024,
    height: 768,
    useContentSize: true,
    // webPreferences: {webSecurity: false},
    center: true,
    resizable: false,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    transparent: false,
    hasShadow: true,
    backgroundColor: '#282A30',
    // titleBarStyle: 'default'
  }
  let opts = Object.assign({}, defaults, options)
  let win: any = new BrowserWindow(opts)
  win.loadURL('http://localhost:8899/index.html')
  win.webContents.openDevTools()
  // if (process.env.NODE_ENV === 'development') {
  //   // win.loadURL(`http://localhost:8080/renderer/page/${path}`)
  //   win.loadURL('http://localhost:8899')
  //   win.webContents.openDevTools()
  // } else {
  //   let url = format({
  //     pathname: join(__dirname, '..', '..', 'dist', 'renderer', path),
  //     protocol: 'file:',
  //     slashes: true
  //   })
  //   win.loadURL(url)
  //   // win.webContents.openDevTools()
  // }
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('closed', () => {
    win = null
  })

  return win
}

// const updaterWindow = ({
//   version
// }: Record<string, any>) => {
//   let win = createWindow('updater/index.html', {
//     width: 300,
//     height: 160,
//     backgroundColor: '#282A30'
//   })
//   win.webContents.on('did-finish-load', () => {
//     win.webContents.send('update-version', version)
//   })
//   return win
// }

exports.openWindow = (
  key,
  query
) => {
  if (key === 'updater') {
    return updaterWindow(query)
  } else {
    let win = createWindow()
    if (process.env.NODE_ENV === 'production') {
      // let updater: any = attachUpdater(win)
      // win.webContents.on('did-finish-load', () => {
      //   updater.checkForUpdates()
      // })

      // app.on('before-quit', () => {
      //   updater.removeAllListeners()
      //   updater = null
      // })
    }
    return win
  }
}
