const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  devtool: 'hidden-source-map',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../../dist'),
    filename: 'boldrui.min.js',
    library: 'BoldrUI',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-addons-css-transition-group': 'var React.addons.CSSTransitionGroup',
    'react-addons-transition-group': 'var React.addons.TransitionGroup',
  },
  resolve: {
    extensions: ['.js', '.scss', '.css'],
  },
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true,
                modules: false,
                context: path.join(process.cwd(), './src'),
                localIdentName: '[name]__[local].[hash:base64:5]',
                minimize: false,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: false,
              },
            },
          ],
        }),
      }],
  },
  plugins: [
    new ExtractTextPlugin('boldr-ui.[name].min.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { warnings: false },
      output: { comments: false },
    }),
  ],
};
