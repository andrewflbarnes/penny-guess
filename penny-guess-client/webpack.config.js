const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/main/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './src/main/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/static')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [htmlPlugin]
};
