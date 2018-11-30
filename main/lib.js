const { BrowserWindow } = require('electron')
const { join, basename } = require('path')
const merge = require('lodash/merge')

exports.openWindow = (path, options = {}) => {
  const defaults = {
    width: 400,
    height: 570,
    // useContentSize: true,
    center: true,
    resizable: false,
    frame: false,
    autoHideMenuBar: true,
    transparent: false,
    hasShadow: true,
    backgroundColor: '#282A30',
    titleBarStyle: 'default'
  }
  let opts = merge({}, defaults, options)
  let win = new BrowserWindow(opts)
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:8080/scene/${path}`)
    win.webContents.openDevTools()
  } else {
    win.loadURL(
      format({
        pathname: join(__dirname, '..', '..', 'dist', path),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  win.on('closed', () => {
    win = null
  })

  return win
}

exports.openedWindows = () => {
  let allWins = BrowserWindow.getAllWindows()
  let opened = allWins.map(v => {
    return basename(parse(v.webContents.getURL()).pathname, '.html')
  })
  return opened
}

exports.getWindow = (key) => {
  let allWins = BrowserWindow.getAllWindows()
  return find(allWins, v => {
    return basename(parse(v.webContents.getURL()).pathname, '.html') === key
  })
}