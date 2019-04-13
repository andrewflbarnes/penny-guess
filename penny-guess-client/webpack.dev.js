const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/mock/index.html",
  filename: "./index.html"
});

module.exports = merge(common, {
  mode: 'development',
  plugins: [htmlPlugin],
  devServer: {
    port: 5006,
    hot: true,
    inline: true,
    stats: {
      colors: true
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:5007',
        secure: false
      },
    },
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
});
