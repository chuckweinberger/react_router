// webpack.config.js

var webpack = require('webpack')
var debug = process.env.NODE_ENV !== "production";

module.exports = {
  entry: './index.js',
  devtool: debug ? "inline-sourcemap" : null,

  output: {
    filename: 'bundle.js',
    path: 'public'
    // publicPath: ''
  },

  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],
}
