import { ipcMain, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import { getWindow } from './window'
// const logger = require('electron-log')

autoUpdater.autoDownload = false
// autoUpdater.autoInstallOnAppQuit =
// logger.transports.file.level = 'info'
// autoUpdater.logger = logger

// autoUpdater.updateConfigPath = require('path').join(
//   __dirname,
//   '..',
//   '..',
//   'dev-app-update.yml'
// )

export default (win: Electron.BrowserWindow) => {
  autoUpdater.once('checking-for-update', () => {
    if (win.isDestroyed() === false) {
      win.webContents.send('checking-for-update')
    }
  })

  autoUpdater.once('update-available', (info: any) => {
    // dialog.showErrorBox('update-available', '')
    if (win) {
      win.webContents.send('update-available', info)
    }
  })

  autoUpdater.once('update-not-available', (info: any) => {
    // dialog.showErrorBox('update-not-available', '')
    if (win) {
      win.webContents.send('update-not-available', info)
    }
  })

  autoUpdater.on('error', (err: Error) => {
    dialog.showErrorBox('err', err.message)
    if (win) {
      win.webContents.send('updater-error', err)
    }
  })

  autoUpdater.on('download-progress', (ret: any) => {
    let win = getWindow('updater') as Electron.BrowserWindow
    win.webContents.send('download-progress', ret)
  })

  autoUpdater.once('update-downloaded', () => {
    autoUpdater.quitAndInstall(true, true)
  })

  ipcMain.on('download-update', () => {
    autoUpdater
      .downloadUpdate()
      .then(() => {
        console.log('wait for post download operation')
      })
      .catch((err: any) => {
        dialog.showErrorBox('error', JSON.stringify(err))
      })
  })

  return autoUpdater
}
