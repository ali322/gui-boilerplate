import { ipcMain } from 'electron'
import { openWindow, opendedWindow, getWindow } from './window'

ipcMain.on('open-window', (_: any, key: string, options: any) => {
  if (opendedWindow().includes(key) === false) {
    openWindow(key, options)
  } else {
    let win = getWindow(key) as Electron.BrowserWindow
    win.focus()
  }
})