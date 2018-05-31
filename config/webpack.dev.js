const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    compress: true,
    open: true,
    public: 'mrm-dev.andela.com:8080',
    historyApiFallback: true,
  },
});
