const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const common = require('./webpack.common.js');


module.exports = merge(common, {
  output: {
    filename: '[name].js',
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    compress: true,
    public: 'mrm-dev.andela.com:8080',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
