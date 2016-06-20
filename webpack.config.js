
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { name: appName } = require('./package.json')
const WebpackMd5Hash = require('webpack-md5-hash')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const path = require('path')

const minimize = process.argv.indexOf('--minimize') !== -1
const isDev = process.env.NODE_ENV !== 'production'
const main = isDev ? 'main.js' : '[name].[chunkhash].js'
const vendor = isDev ? 'vendor.js' : '[name].[chunkhash].js'
const styles = isDev ? 'styles.css' : 'styles.[chunkhash].css'

if (isDev) require('dotenv').config()

// Optimize build process with the help of html-webpack-plugin
// https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.2boq97v33

const plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', vendor),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      API_HOST: JSON.stringify(process.env.API_HOST || 'nodejs-express-demo.herokuapp.com')
    }
  }),
  new ExtractTextPlugin(styles, { allChunks: true }),
  new HtmlWebpackPlugin({
    title: appName,
    template: 'index.html.ejs',
    baseHref: '/'
  })
]

if (minimize) {
  plugins.push(...[
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

/**
 * Config
 */

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    main: './index.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux-thunk',
      'redux',
      'moment',
      'isomorphic-fetch',
      'classnames'
    ]
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: main,
    chunkFilename: main,
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ])
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  sassLoader: {
    includePaths: [path.join(__dirname, 'client/styles')]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [autoprefixer],
  plugins: plugins,
  devServer: {
    contentBase: './client',
    hot: true
  }
}
