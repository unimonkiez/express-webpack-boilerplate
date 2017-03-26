const path = require('path');
const webpack = require('webpack');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '..');

module.exports = ({ isProd = false, isWebpackDevServer = false } = {}) => ({
  devtool: 'source-map',
  entry: {
    [`app${isProd ? '.min' : ''}`]: (
      isWebpackDevServer ? ['webpack-hot-middleware/client'] : []
    ).concat(path.join(rootPath, 'app', 'index.js'))
  },
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: isWebpackDevServer,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(isProd),
      __DEV__: JSON.stringify(!isProd),
      __DEVSERVER__: JSON.stringify(isWebpackDevServer),
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
      }
    }),
    new HtmlWebpackPlugin({
      minify: {},
      template: path.join(rootPath, 'app', 'index.html'),
      inject: 'body'
    })
  ]
  .concat(isWebpackDevServer ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [])
  .concat(isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ] : []),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2']
            }
          }
        ]
      }, {
        test: /\.html$/,
        issuer: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './template/[hash].[ext]'
            }
          }
        ]
      }, {
        test: /\.html$/,
        issuer: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'to-string-loader'
          }
        ]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'to-string-loader'
            },
            {
              loader: 'css-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }, {
        test: /\.woff(2)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './font/[hash].[ext]',
              mimetype: 'application/font-woff'
            }
          }
        ]
      }, {
        test: /\.(ttf|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './font/[hash].[ext]'
            }
          }
        ]
      }, {
        test: /\.(gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './asset/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      rootPath,
      path.join(rootPath, 'node_modules')
    ]
  }
});
