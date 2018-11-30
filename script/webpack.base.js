const entry = require('./entry')
const { resolve, urlLoaderOptions } = require('./util')
let extract = process.env.NODE_ENV === 'production'

module.exports = {
  entry,
  target: 'electron-renderer',
  output: {
    path: resolve('dist'),
    filename: '[name]/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { cacheDirectory: true }
      },
      {
        test: /\.map$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: /aid-favicon.ico/,
        loader: 'url-loader',
        options: urlLoaderOptions(extract)
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: urlLoaderOptions(extract)
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      'vue-router': 'vue-router/dist/vue-router.esm.js'
    }
  }
}
