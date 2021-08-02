const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: ['./js/index.js', './js/play.js', './js/computerPlayer.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tools',
      template: 'index.html',
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
