const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    hotOnly: true
    /* Proxy to a backend, add appropriate url and port
    proxy: {
      '**': 'http://127.0.0.1:8000/'
    }
    */
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'style-loader'
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]_[hash]',
          }
        }, {
          loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    }),
  ]
};