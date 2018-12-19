'use strict'

const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');

const prodWebpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  mode: 'production'
});

module.exports = prodWebpackConfig;
