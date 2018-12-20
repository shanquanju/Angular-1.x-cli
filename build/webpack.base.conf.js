'use strict'

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  //  入口
  entry: {
    app: ['babel-polyfill', './src/app.js']
  },
  //  加载器
  module: {
    rules: [{
        test: /\.js$/,
        enforce: "pre",
        // 指定例外的目录
        exclude: resolve('node_modules'),
        // 指定检查的目录
        include: resolve('src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2017', 'stage-2'],
            plugins: ['transform-runtime', 'transform-decorators-legacy']
          }
        }, {
          loader: 'eslint-loader',
          options: {
            // 指定错误报告的格式规范
            formatter: require('eslint-friendly-formatter')
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      //处理html模板
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.html'],
    alias: {
      "@": resolve('src')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
