const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./js/app.js', './js/notification.js', './js/tweets-list.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tools',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
