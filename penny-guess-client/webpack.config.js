const packageJSON = require('./package.json');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/main/index.html",
  filename: "./index.html"
});

const PATHS = {
  build: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'webjars', packageJSON.name, packageJSON.version)
};

module.exports = {
  entry: './src/main/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, PATHS.build)
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [htmlPlugin],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
