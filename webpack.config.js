const { resolve } = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path: resolve(`${__dirname}/dist`),
    filename: '[name].bundle.js',
    publicPath: "dist/"
  },
  watch: true,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
};
