const webpack = require('webpack')
const merge = require('webpack-merge')
const InjectHtmlPlugin = require('inject-html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const TidyStatsPlugin = require('tidy-stats-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const base = require('./webpack.base')
const entry = require('./entry')
const {
  pagePath,
  distPath,
  vendorPath,
  vendorURLOfProd
} = require('./constant')
const { basename, join, posix } = require('path')

module.exports = merge(base, {
  entry,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
    ]
  },
  devtool: false,
  stats: 'minimal',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new MiniCSSExtractPlugin({
      filename: '[name]/[name].css'
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: join(vendorPath, 'main-manifest.json')
    }),
    new TidyStatsPlugin({
      identifier: 'renderer'
    })
    // new BundleAnalyzerPlugin()
  ].concat(
    Object.keys(entry).map(
      k =>
        new InjectHtmlPlugin({
          transducer: file => basename(file),
          chunks: [k],
          output: join(distPath, k, 'index.html'),
          filename: join(pagePath, k, 'index.html'),
          more: {
            js: [posix.join(vendorURLOfProd, 'main-vendor.js')],
            css: [posix.join(vendorURLOfProd, 'main-vendor.css')]
          }
        })
    )
  )
})
