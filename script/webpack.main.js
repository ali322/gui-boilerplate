const webpack = require('webpack')
const TidyStatsPlugin = require('tidy-stats-webpack-plugin')
const { entryOfMain, distPathOfMain } = require('./constant')
const { resolve } = require('./util')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'electron-main',
  mode: isProd ? 'production' : 'development',
  entry: entryOfMain,
  stats: 'minimal',
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  output: {
    path: distPathOfMain,
    filename: 'index.js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: isProd
    }),
    new TidyStatsPlugin({
      identifier: 'main'
    })
  ]
}