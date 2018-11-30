const path = require('path')

const resolve = dir => path.resolve(__dirname, '..', dir)

exports.rendererPath = resolve('app')
exports.mainPath = resolve('main')
exports.mainEntry = path.join('main', 'index.dev.js')
exports.buildPath = resolve('dist')
exports.outputPath = resolve('output')
exports.icoPath = resolve('ico/electron')
exports.scenePath = path.join(exports.rendererPath, 'scene')
exports.scenes = ['index', 'other']
