const { app } = require('electron')
const { openWindow } = require('./lib/window')
// import attachMenu from './lib/menu'
// import './lib/ipc'

let win = null

app.on('ready', () => {
  // let menus = attachMenu(app)
  // const menu = Menu.buildFromTemplate(menus)
  // Menu.setApplicationMenu(menu)
  win = openWindow('index')
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
