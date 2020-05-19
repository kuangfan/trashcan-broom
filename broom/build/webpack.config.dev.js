const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'web',

  devtool: 'source-map',

  mode: 'development',

  entry: path.resolve(__dirname, '../index.js'),

  resolve: {
    extensions: ['.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './../dist/index.html'),
      template: path.resolve(__dirname, './../public/index.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/error.collecting.js'),
          to: path.resolve(__dirname, '../dist')
        }
      ]
    })
  ]
}