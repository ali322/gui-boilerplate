const baseConf = require('./snowpack.base')

module.exports = Object.assign({}, baseConf, {
  buildOptions: {
    out: 'dist'
  }
})
