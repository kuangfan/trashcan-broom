const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'web',

  devtool: 'source-map',

  mode: 'production',

  entry: path.resolve(__dirname, '../index.js'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },

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
        },
        {
          from: path.resolve(__dirname, '../public/tracekit.js'),
          to: path.resolve(__dirname, '../dist')
        }
      ]
    })
  ]
}
