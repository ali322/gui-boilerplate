const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
// const TidyStatsPlugin = require('tidy-stats-webpack-plugin')
const InjectHtmlPlugin = require('inject-html-webpack-plugin')
const { join, basename } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const base = require('./webpack.base')
const entry = require('./entry')
const { resolve, cssLoaders, vueStyleLoaders } = require('./util')

let htmls = Object.keys(entry).map(v => {
  return new InjectHtmlPlugin({
    transducer: file => basename(file),
    chunks: [v],
    output: resolve(join('dist', v, `${v}.html`)),
    filename: resolve(join('app', v, `${v}.html`))
  })
})

module.exports = merge(base, {
  entry,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders({ isDev: false })
      },
      {
        test: /\.less$/,
        use: cssLoaders({ isDev: false }, 'less')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devtool: false,
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new VueLoaderPlugin(),
    new MiniCSSExtractPlugin({
      filename: '[name]/[name].css'
    })
    // new TidyStatsPlugin()
  ].concat(htmls)
})
