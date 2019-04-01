const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { urlLoaderOptions, cssLoaders , resolve } = require('./util')
const { distPath } = require('./constant')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'electron-renderer',
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader', 
            options: {
              esModule: true
            }
        }
        ]
      },
      {
        test: /\.css$/,
        use: cssLoaders(isProd)
      },
      {
        test: /\.less$/,
        use: cssLoaders(isProd, 'less')
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: /aid-favicon.ico/,
        loader: 'url-loader',
        options: urlLoaderOptions(isProd)
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: urlLoaderOptions(isProd)
      }
    ]
  },
  output: {
    path: distPath,
    filename: '[name]/[name].js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': resolve('renderer')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
