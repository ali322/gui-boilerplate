const baseConf = require('./snowpack.base')

module.exports = Object.assign({}, baseConf, {
  buildOptions: {
    out: 'dist/renderer'
  },
  plugins: baseConf.plugins.concat([
    ['snowpack-plugin-terser', {
      terserOptions: {
        compress: {
          dead_code: true
        }
      }
    }]
  ])
})
