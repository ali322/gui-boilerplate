const { join, sep } = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

exports.resolve = (...dir) => join(__dirname, '..', ...dir)

exports.urlLoaderOptions = (extract = false) => {
  let options = {
    limit: 3000
  }
  if (extract) {
    options.outputPath = join('asset', sep)
    options.publicPath = join('..', 'asset', sep)
  }
  return options
}

exports.cssLoaders = (extract = false, precessor = '') => {
  let loaders = ['vue-style-loader', 'css-loader', 'resolve-url-loader']
  if (precessor) {
    loaders.push({
      loader: `${precessor}-loader`,
      options: { sourceMap: true }
    })
  }
  return extract
    ? [MiniCSSExtractPlugin.loader].concat(loaders.slice(1))
    : loaders
}
