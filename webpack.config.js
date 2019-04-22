const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Function to get plugins (some conditionally for production)
const getPlugins = (devMode) => {
  const hashType = devMode ? 'hash' : 'contenthash';
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'frontend/src/index.html'),
      favicon: path.resolve(__dirname, 'frontend/src/assets/img/favicon.png'),
      title: 'Workout Tracker'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : `[name].[${hashType}].css`,
      chunkFilename: devMode ? '[name].css' : `[name].[${hashType}].css`,
    }),
    new webpack.HashedModuleIdsPlugin()
  ];
  if (!devMode) { plugins.push(new CleanWebpackPlugin()); }
  return plugins;
};

module.exports = (env, options) => {
  const devMode = options.mode === 'development';
  const hashType = devMode ? 'hash' : 'contenthash';
  return {
    entry: path.resolve(__dirname, 'frontend/src/index.js'),
    output: {
      filename: `[name].[${hashType}].js`,
      publicPath: '/static/'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devtool: devMode ? 'inline-source-map' : false,
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, 'dist'),
      proxy: {
        '**': 'http://localhost:3000/'
      }
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'frontend/src/assets'),
        state: path.resolve(__dirname, 'frontend/src/state'),
        api: path.resolve(__dirname, 'frontend/src/api')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'frontend/src'),
          use: ['babel-loader']
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'frontend/src'),
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: `[name]-[${hashType}]`,
              }
            },
            'sass-loader'
          ]
        },
        // Vendor specific css
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'frontend/src/assets/css/vendor.css'),
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
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
    plugins: getPlugins(devMode)
  };
};
