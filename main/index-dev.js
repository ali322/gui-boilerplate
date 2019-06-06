/* eslint-disable */

// Set environment for development
process.env.NODE_ENV = 'development'

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

// Install `extensions`
// const { default:installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
// require('electron').app.on('ready', () => {
//   const extensions = [
//     REACT_DEVELOPER_TOOLS
//   ]
//   Promise.all(installExtension.map(ext => installer.default(ext)))
//     .then(() => {})
//     .catch(err => {
//       console.log('Unable to install `vue-devtools`: \n', err)
//     })
// })

// Require `main` process to boot app
require('../dist/main/index')