const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'bundle': [
            path.resolve(__dirname, 'src') + '/app.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'app.js',
        publicPath: '/app/'
    },
    resolve: {
      // alias - короткая ссылка на папку
      alias: {
        '@js': path.resolve(__dirname, 'src'),
        process: "process/browser",
      },
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
              },
              {
                test: /\.s?css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
              },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
          }),
        new CopyWebpackPlugin({patterns:[
            { from: './src/index.html', to: '../' }
        ]}), 
        // для доступа к переменной окружения process
        // https://stackoverflow.com/questions/65018431/webpack-5-uncaught-referenceerror-process-is-not-defined   
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
    ],
};