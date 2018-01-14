module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: './dist/bundle.js'
  },
  devServer: {
    contentBase: './website/',
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
      }
    ]
  }
};
