const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../app.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '../dist/bundle.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /(\.css)$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' }, // create style npdes from js strings
          { loader: 'css-loader' }, // translate css into commonjs
          { loader: 'sass-loader' } // compiles sass to css
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
}
