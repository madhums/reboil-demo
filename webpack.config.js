
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
require('babel-polyfill');

const PORT = 3000;
const minimize = process.argv.indexOf('--optimize-minimize') !== -1;
const appEnv = process.env.APP_ENV;
const isProduction = appEnv === 'production';
const isDev = appEnv === 'development';
const main = isDev ? 'main.js' : `[name].[chunkhash].${appEnv}.js`;
const vendor = isDev ? 'vendor.js' : `[name].[chunkhash].${appEnv}.js`;
const styles = isDev ? 'styles.css' : `styles.[chunkhash].${appEnv}.css`;
const devtool = isDev
    ? 'cheap-module-eval-source-map'
    : 'source-map';

if (isDev) require('dotenv').config();

// Optimize build process with the help of html-webpack-plugin
// https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.2boq97v33

const extractSass = new ExtractTextPlugin({
  filename: styles,
  allChunks: true,
  disable: isDev
});

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: vendor
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      APP_ENV: JSON.stringify(process.env.APP_ENV),
      API_HOST: JSON.stringify(process.env.API_HOST)
    }
  }),
  extractSass,
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: ['last 2 version']
        })
      ]
    }
  }),
  new HtmlWebpackPlugin({
    title: 'Your app',
    template: 'index.html.ejs',
    favicon: path.join(__dirname, './client/assets/favicon.ico'),
    trackingCode: isProduction && process.env.GA_CODE
  })
];

const source = [
  'babel-polyfill'
];

if (minimize) {
  plugins.push(...[
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]);
} else {
  plugins.push(...[
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()
  ]);
  source.push(...[
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    `webpack-dev-server/client?http://localhost:${PORT}`,

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server'
  ]);
}

source.push(...[
  './styles/index.scss',
  './index.js'
]);

/**
 * Config
 */

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    main: source,
    vendor: [
      'classnames',
      'i18n-js',
      'isomorphic-fetch',
      'moment',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-saga',
    ]
  },
  devtool,
  output: {
    path: path.join(__dirname, './build'),
    filename: main,
    chunkFilename: main,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        enforce: 'pre',
        use: ['import-glob-loader']
      },
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.css$/,
        include: /client/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'style-loader',
            'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(scss|sass)$/,
        include: /client/,
        loader: extractSass.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['file-loader?publicPath=/']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
        ]
      }
    ]
  },
  plugins: plugins,
  devServer: {
    historyApiFallback: true,
    contentBase: './client',
    port: PORT,
    inline: true,
    hot: true
  }
};
