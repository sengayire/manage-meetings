const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: '[name].min.js',
  },
  devtool: 'false',
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  plugins: [
    new CompressionPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(['dist']),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
});
