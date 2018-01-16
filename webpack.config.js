const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, './src/app/'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin([{
      from: path.join(__dirname, './src/app/'),
      to: path.join(__dirname, './dist/')
    }]),
    new uglifyJsPlugin()
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.webpack.js', '.web.js', '.js', '.json','jsx', 'css']
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: true,
    setImmediate: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};