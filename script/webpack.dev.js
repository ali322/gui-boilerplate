const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base')
const mapValues = require('lodash/mapValues')
const TidyStatsPlugin = require('tidy-stats-webpack-plugin')
const InjectHtmlPlugin = require('inject-html-webpack-plugin')
const { join, posix } = require('path')
const entry = require('./entry')
const {
  pagePath,
  distPath,
  vendorPath,
  publicPath,
  vendorURL
} = require('./constant')

module.exports = merge(base, {
  entry: mapValues(entry, v =>
    ['react-hot-loader/patch',join(__dirname, 'dev-client.js')].concat(v)
  ),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',
          // 'babel-loader',
          'awesome-typescript-loader'
        ]
      },
    ]
  },
  output: {
    publicPath
  },
  devtool: '#source-map',
  stats: 'errors-only',
  devServer: {
    // contentBase: distPath,
    compress: true
  },
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new TidyStatsPlugin({ ignoreAssets: true }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: join(vendorPath, 'main-manifest.json')
    })
  ].concat(
    Object.keys(entry).map(
      k =>
        new InjectHtmlPlugin({
          transducer: '/hmr/',
          chunks: [k],
          filename: join(pagePath, k, 'index.html'),
          more: {
            js: [posix.join(vendorURL, 'main-vendor.js')],
            css: [posix.join(vendorURL, 'main-vendor.css')]
          }
        })
    )
  )
})
