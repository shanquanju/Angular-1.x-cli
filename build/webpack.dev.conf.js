'use strict'

const merge = require('webpack-merge');
const path = require('path');
const portfinder = require('portfinder');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseWebpackConfig = require('./webpack.base.conf');
const packageConfig = require('../package.json')

const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

const createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') {
      return;
    }

    const error = errors[0];

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      icon: path.join(__dirname, '..', 'favicon.ico')
    })
  }
}

const devWebpackConfig = merge(baseWebpackConfig, {
  //  输出
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: resolve('/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    clientLogLevel: 'none',
    hot: true,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    open: true,
    quiet: true,
    proxy: {}
  },
  devtool: '#cheap-module-source-map',
  mode: 'development'
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || devWebpackConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.HOST = devWebpackConfig.devServer.host;
      process.env.PORT = port;

      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: createNotifierCallback()
      }));

      resolve(devWebpackConfig);
    }
  });
});
