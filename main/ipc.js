const { ipcMain } = require('electron')
const { openWindow, getWindow, openedWindows } = require('./lib')
const {join} = require('path')

ipcMain.on('open-window', (evt, key, options) => {
  if (openedWindows().includes(key) === false) {
    openWindow(join('scene', key, `${key}.html`))
  } else {
    getWindow(key).focus()
  }
})