import { app, Menu } from 'electron'
import { openWindow } from './lib/window'
import attachMenu from './lib/menu'
import './lib/ipc'

let win: any = null

app.on('ready', () => {
  let menus = attachMenu(app)
  const menu = Menu.buildFromTemplate(menus)
  Menu.setApplicationMenu(menu)
  win = openWindow('updater')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    win = openWindow('index')
  }
})
