const webpack = require('webpack')
const merge = require('webpack-merge')
const ChunkAssetPlugin = require('chunk-asset-webpack-plugin')
const TidyStatsPlugin = require('tidy-stats-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { join, extname } = require('path')
const { resolve } = require('./util')
const base = require('./webpack.base')
const { distPath, vendorPath, vendors } = require('./constant')


const vendorJSConf = {
  name: 'js',
  mode: 'production',
  entry: vendors.js,
  output: {
    path: vendorPath,
    filename: '[name]-vendor.js',
    library: '[name]_[hash]'
  },
  resolve: {
    alias: {
      // 'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.json', '.js']
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: join(vendorPath, '[name]-manifest.json'),
      context: __dirname
    }),
    new TidyStatsPlugin({
      identifier: 'vendor:js'
    })
  ]
}

const vendorCSSConf = merge(base, {
  name: 'css',
  mode: 'production',
  entry: vendors.css,
  output: {
    path: distPath
  },
  stats: 'minimal',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new MiniCSSExtractPlugin({
      filename: 'vendor/[name]-vendor.css'
    }),
    new ChunkAssetPlugin({
      chunks: {
        main: files => files.filter(v => extname(v) !== '.js')
      }
    }),
    new TidyStatsPlugin({
      identifier: 'vendor:css'
    })
  ]
})

module.exports = [vendorJSConf, vendorCSSConf]
