const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

const output = merge({
    mode: 'development',
    plugins: [ 
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify("development"),
        })
    ],
}, common);

module.exports = output;