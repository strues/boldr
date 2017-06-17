const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeObjectHash = require('node-object-hash');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const PATHS = require('./paths');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  // devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    PATHS.clientEntry,
  ],
  output: {
    filename: '[name].js',
    path: PATHS.staticDir,
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [PATHS.srcDir, 'node_modules', PATHS.nodeModulesDir],
    mainFields: ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
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
        use: [
          {
            loader: 'cache-loader',
            options: {
              // provide a cache directory where cache items should be stored
              cacheDirectory: PATHS.cacheDir,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              comments: false,
              presets: [
                [
                  'babel-preset-boldr/browser',
                  {
                    useBuiltins: true,
                    modules: false,
                    exclude: ['transform-regenerator', 'transform-async-to-generator'],
                  },
                ],
              ],
              plugins: [
                'react-hot-loader/babel',
                [
                  'import-inspector',
                  {
                    serverSideRequirePath: true,
                    webpackRequireWeakId: true,
                  },
                ],
                [
                  'styled-components',
                  {
                    ssr: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // https://webpack.js.org/guides/migrating/#complex-options
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-cssnext')({
                    browsers: ['> 1%', 'last 2 versions'],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractCssChunks(),
    // only needed when server built with webpack
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: '[name].js',
      minChunks: Infinity,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
