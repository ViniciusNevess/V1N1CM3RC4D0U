const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const path                   = require('path');

module.exports = {
  mode: "development",
  entry: "./frontend/index.js",
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "template.html")
    })
  ],
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ] 
    }
};