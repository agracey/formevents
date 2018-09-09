var path = require('path')

var APP_DIR = path.resolve(__dirname, 'client/src/')

var config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, 'client/src/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'client/static/js/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: APP_DIR,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['stage-2', 'react', 'es2017'],
          cacheDirectory: true
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(path.resolve(__dirname, 'client/src')),
      path.resolve('./node_modules')
    ]
  }
}

module.exports = config
