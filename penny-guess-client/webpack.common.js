const packageJSON = require('./package.json');
const path = require('path');

const PATHS = {
  build: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources')
};

module.exports = {
  entry: './src/main/app.js',
  output: {
    filename: `${packageJSON.name}-${packageJSON.version}.js`,
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
