const merge = require('webpack-merge')
const webpack = require('webpack')
const { join } = require('path')
const mapValues = require('lodash/mapValues')
const TidyStatsPlugin = require('tidy-stats-webpack-plugin')
const InjectHtmlPlugin = require('inject-html-webpack-plugin')
const base = require('./webpack.base')
const entry = require('./entry')
const { cssLoaders, vueStyleLoaders, resolve } = require('./util')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let htmls = Object.keys(entry).map(v => {
  return new InjectHtmlPlugin({
    transducer: '/hmr/',
    chunks: [v],
    filename: resolve(join('app', 'scene', v, `${v}.html`))
  })
})

module.exports = merge(base, {
  entry: mapValues(entry, v => {
    return [join(__dirname, 'dev.client.js'), v]
  }),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders({isDev: true})
      },
      {
        test: /\.less$/,
        use: cssLoaders({isDev: true}, 'less')
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  output: {
    publicPath: '/hmr/'
  },
  mode: 'development',
  devtool: '#source-map',
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new TidyStatsPlugin({ ignoreAssets: true })
  ].concat(htmls)
})
