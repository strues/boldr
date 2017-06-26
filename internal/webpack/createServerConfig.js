/* eslint-disable max-lines, prefer-template */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { removeNil, ifElse } = require('boldr-utils');
const StatsPlugin = require('stats-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const config = require('../config');

const CWD = fs.realpathSync(process.cwd());

const cache = {
  'server-production': {},
  'server-development': {},
};
const EXCLUDES = [/node_modules/, config.assetsDir, config.serverCompiledDir];
// This is the Webpack configuration for Node
module.exports = function createServerConfig(options) {
  // debug(boldrRoot.toString());
  const _DEV = process.env.NODE_ENV === 'development';
  const _PROD = process.env.NODE_ENV === 'production';
  const ifDev = ifElse(_DEV);

  const nodeModules = path.join(CWD, 'node_modules');
  const serverExternals = fs
    .readdirSync(nodeModules)
    .filter(
      x => !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(x),
    )
    .reduce((externals, request) => {
      externals[request] = `commonjs ${request}`;
      return externals;
    }, {});

  const nodeConfig = {
    // pass either node or web
    target: 'node',
    name: 'server',
    // user's project root
    context: config.rootDir,
    // sourcemap
    devtool: '#source-map',
    entry: [`${config.srcDir}/core/entry/server.js`],
    output: {
      path: path.join(CWD, 'build'),
      filename: 'server.js',
      sourcePrefix: '  ',
      publicPath: '/',
      // only prod
      pathinfo: _DEV,
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    },
    // true if prod
    bail: _PROD,
    // cache dev
    cache: _DEV,
    // true if prod & enabled in settings
    profile: false,
    node: {
      console: false,
      __filename: true,
      __dirname: true,
      fs: false,
    },
    performance: false,
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: [config.srcDir, 'node_modules'],
      mainFields: ['module', 'jsnext:main', 'main'],
      alias: {
        '@@scenes': path.resolve(config.srcDir, 'scenes'),
        '@@state': path.resolve(config.srcDir, 'state'),
        '@@admin': path.resolve(config.srcDir, 'scenes/Admin'),
        '@@blog': path.resolve(config.srcDir, 'scenes/Blog'),
        '@@components': path.resolve(config.srcDir, 'components'),
        '@@core': path.resolve(config.srcDir, 'core'),
        '@@theme': path.resolve(config.srcDir, 'theme'),
      },
    },
    resolveLoader: {
      modules: [config.nodeModules, config.srcDir],
      moduleExtensions: ['-loader'],
    },
    externals: serverExternals,
    module: {
      noParse: [/\.min\.js/],
      strictExportPresence: true,
      rules: [
        // js
        {
          test: /\.js$/,
          include: config.srcDir,
          // exclude: EXCLUDES,
          use: removeNil([
            ifDev({
              loader: 'cache-loader',
              options: {
                cacheDirectory: config.cacheDir,
              },
            }),
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                compact: true,
                sourceMaps: true,
                comments: false,
                cacheDirectory: _DEV,
                presets: [
                  [
                    'babel-preset-boldr/node',
                    {
                      debug: false,
                      useBuiltins: true,
                      modules: false,
                      targets: {
                        node: 'current',
                      },
                      exclude: ['transform-regenerator', 'transform-async-to-generator'],
                    },
                  ],
                ],
                plugins: [
                  [
                    'babel-plugin-styled-components',
                    {
                      ssr: true,
                    },
                  ],
                ],
              },
            },
          ]),
        },
        {
          test: /\.css$/,
          exclude: EXCLUDES,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                importLoaders: 1,
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
        // scss
        {
          test: /\.scss$/,
          exclude: EXCLUDES,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                importLoaders: 1,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
        // json
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        // url
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          exclude: EXCLUDES,
          options: { limit: 10000, emitFile: false },
        },
        {
          test: /\.svg(\?v=\d+.\d+.\d+)?$/,
          exclude: EXCLUDES,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]', // eslint-disable-line
        },
        // file
        {
          test: /\.(ico|eot|ttf|otf|mp4|mp3|ogg|pdf|html)$/, // eslint-disable-line
          loader: 'file-loader',
          exclude: EXCLUDES,
          options: {
            emitFile: false,
          },
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: _PROD,
        debug: !_DEV,
        context: config.rootDir,
      }),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      // EnvironmentPlugin is essentially DefinePlugin but allows you to
      // forgo the process.env. when defining.
      // Anything placed in EnvironmentPlugin / DefinePlugin will be
      // inlined when compiled with Webpack.
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(_DEV),
        __SERVER__: JSON.stringify(false),
        __CLIENT__: JSON.stringify(true),
      }),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: true,
      }),
    ],
  };

  if (_DEV) {
    nodeConfig.stats = 'none';
    nodeConfig.watch = true;
    nodeConfig.plugins.push(
      new CaseSensitivePathsPlugin(),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        // show a warning when there is a circular dependency
        failOnError: false,
      }),
    );
  }
  return nodeConfig;
};
