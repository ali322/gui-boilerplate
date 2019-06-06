const { resolve } = require('./util')
const { sep, posix } = require('path')

exports.pagePath = resolve('renderer', 'page')
exports.distPath = resolve('dist', 'renderer')
exports.vendorPath = resolve('dist', 'renderer', 'vendor')
exports.vendorURL = posix.join(sep, 'dist', 'renderer', 'vendor')
exports.vendorURLOfProd = posix.join('..', 'vendor')
exports.publicPath = '/hmr/'

exports.distPathOfMain = resolve('dist', 'main')
exports.entryOfMain = resolve('main', 'index')

exports.vendors = {
  js: ['react', 'react-dom', 'react-router-dom', 'lodash'],
  css: ['@fortawesome/fontawesome-free/css/all.css']
}
