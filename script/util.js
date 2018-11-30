const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const assign = require('lodash/assign')

exports.resolve = dir => path.resolve(__dirname, '..', dir)

exports.cssLoaders = (context, preprocessor = '') => {
  let loaders = [
    { loader: require.resolve('vue-style-loader') },
    {
      loader: require.resolve('css-loader'),
      options: { minimize: !context.isDev }
    },
    { loader: require.resolve('resolve-url-loader'), options: { debug: false } }
  ]
  if (preprocessor) {
    if (typeof preprocessor === 'string') {
      loaders = loaders.concat([
        {
          loader: `${preprocessor}-loader`,
          options: { sourceMap: true }
        }
      ])
    } else if (typeof preprocessor === 'object') {
      loaders = loaders.concat([preprocessor])
    } else {
      throw new Error('invalid preprocessor')
    }
  }
  if (!context.isDev) {
    return [MiniCSSExtractPlugin.loader].concat(loaders.slice(1))
  }
  return loaders
}

exports.urlLoaderOptions = (extract = false) => {
  let options = {
    limit: 3000
  }
  if (extract) {
    options.outputPath = path.join('asset', path.sep)
    options.publicPath = path.join('..', 'asset', path.sep)
  }
  return options
}
