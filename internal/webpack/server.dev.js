const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeObjectHash = require('node-object-hash');
const PATHS = require('./paths');

const externals = fs
  .readdirSync(PATHS.nodeModulesDir)
  .filter(
    x => !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(x),
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  // devtool: 'eval',
  entry: [PATHS.serverEntry],
  externals,
  output: {
    path: PATHS.distDir,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [PATHS.srcDir, 'node_modules', PATHS.nodeModulesDir],
    mainFields: ['module', 'jsnext:main', 'main'],
    descriptionFiles: ['package.json'],
    alias: {
      '~scenes': path.resolve(PATHS.srcDir, 'shared/scenes'),
      '~state': path.resolve(PATHS.srcDir, 'shared/state'),
      '~admin': path.resolve(PATHS.srcDir, 'shared/scenes/Admin'),
      '~blog': path.resolve(PATHS.srcDir, 'shared/scenes/Blog'),
      '~components': path.resolve(PATHS.srcDir, 'shared/components'),
      '~core': path.resolve(PATHS.srcDir, 'shared/core'),
      '~templates': path.resolve(PATHS.srcDir, 'shared/templates'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: PATHS.srcDir,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          comments: false,
          presets: [
            [
              'babel-preset-boldr/node',
              {
                debug: false,
                useBuiltins: true,
                modules: false,
                targets: {
                  node: 8,
                },
                exclude: ['transform-regenerator', 'transform-async-to-generator'],
              },
            ],
          ],
          plugins: [
            [
              'styled-components',
              {
                ssr: true,
              },
            ],
            [
              'import-inspector',
              {
                serverSideRequirePath: true,
                webpackRequireWeakId: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new HardSourceWebpackPlugin({
      cacheDirectory: path.join(PATHS.cacheDir, '[confighash]'),
      recordsPath: path.join(PATHS.cacheDir, '[confighash]/records.json'),
      configHash: webpackConfig => nodeObjectHash().hash(webpackConfig),
      environmentHash: {
        root: process.cwd(),
        directories: ['node_modules'],
        files: ['package.json', 'yarn.lock'],
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
