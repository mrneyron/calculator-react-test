const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');


const output = merge({
  mode: 'production',
  plugins: [ 
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      /ru/
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
    })
  ],
}, common);

module.exports = output;