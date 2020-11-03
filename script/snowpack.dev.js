const baseConf = require('./snowpack.base')

module.exports = Object.assign({}, baseConf, {
  plugins: baseConf.plugins.concat([
    ['@snowpack/plugin-run-script', { cmd: 'npm run start:main' }]
  ])
})
