'use strict'

const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf');

const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

const prodWebpackConfig = merge(baseWebpackConfig, {
  output: {
    path: resolve('dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: {
          inline: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    })
  ],
  devtool: '#source-map',
  mode: 'production'
});

module.exports = prodWebpackConfig;
