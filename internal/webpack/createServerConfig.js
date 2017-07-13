/* eslint-disable max-lines, prefer-template */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const dotenv = require('dotenv');
const ifElse = require('boldr-utils/lib/logic/ifElse');
const appRoot = require('boldr-utils/lib/node/appRoot');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const loaderUtils = require('loader-utils');

const config = require('../config');
const ChunkNames = require('./plugins/ChunkNames');
const VerboseProgress = require('./plugins/VerboseProgress');

const CWD = fs.realpathSync(process.cwd());
dotenv.load();

const cache = {
  'server-production': {},
  'server-development': {},
};
const LOCAL_IDENT = '[name]__[local]___[hash:base64:5]';
const EXCLUDES = [/node_modules/, config.assetsDir, config.serverCompiledDir];
const CACHE_HASH_TYPE = 'sha256';
const CACHE_DIGEST_TYPE = 'base62';
const CACHE_DIGEST_LENGTH = 4;
// This is the Webpack configuration for Node
module.exports = function createServerConfig(options) {
  // debug(boldrRoot.toString());
  const _DEV = process.env.NODE_ENV === 'development';
  const _PROD = process.env.NODE_ENV === 'production';
  const ifDev = ifElse(_DEV);
  const PROJECT_CONFIG = require(path.resolve(appRoot.get(), 'package.json'));
  const CACHE_HASH = loaderUtils.getHashDigest(
    JSON.stringify(PROJECT_CONFIG),
    CACHE_HASH_TYPE,
    CACHE_DIGEST_TYPE,
    CACHE_DIGEST_LENGTH,
  );
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

  const cacheLoader = {
    loader: 'cache-loader',
    options: {
      cacheDirectory: path.resolve(
        config.cacheDir,
        `loader-${CACHE_HASH}-server-${process.env.NODE_ENV}`,
      ),
    },
  };
  const nodeConfig = {
    // pass either node or web
    target: 'async-node',
    name: 'server',
    // user's project root
    context: config.rootDir,
    // sourcemap
    devtool: '#source-map',
    entry: [`${config.srcDir}/core/entry/server.js`],
    output: {
      path: path.join(CWD, 'build'),
      filename: 'serverRenderer.js',
      sourcePrefix: '  ',
      publicPath: '/assets/',
      // only prod
      pathinfo: _DEV,
      libraryTarget: 'commonjs2',
      crossOriginLoading: 'anonymous',
    },
    // true if prod
    bail: _PROD,
    // cache dev
    cache: _DEV,
    // true if prod & enabled in settings
    profile: false,

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
          use: [
            cacheLoader,
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                compact: !_DEV,
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
                        uglify: !_DEV,
                        node: 8,
                      },
                      exclude: ['transform-regenerator', 'transform-async-to-generator'],
                    },
                  ],
                ],
                plugins: [
                  'dual-import',
                  [
                    'babel-plugin-styled-components',
                    {
                      ssr: true,
                    },
                  ],
                ],
              },
            },
          ].filter(Boolean),
        },
        // scss
        {
          test: /\.(scss|css)$/,
          exclude: EXCLUDES,
          use: [
            cacheLoader,
            {
              loader: 'css-loader/locals',
              options: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                importLoaders: false,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'fast-sass-loader' },
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
        minimize: false,
        debug: !_DEV,
        context: config.rootDir,
      }),
      // EnvironmentPlugin is essentially DefinePlugin but allows you to
      // forgo the process.env. when defining.
      // Anything placed in EnvironmentPlugin / DefinePlugin will be
      // inlined when compiled with Webpack.
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BOLDR_GRAPHQL_URL: JSON.stringify(process.env.BOLDR_GRAPHQL_URL),
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(_DEV),
        __SERVER__: JSON.stringify(false),
        __CLIENT__: JSON.stringify(true),
      }),
      // Custom progress plugin
      new VerboseProgress(),

      // Automatically assign quite useful and matching chunk names based on file names.
      new ChunkNames(),
      _DEV ? new CaseSensitivePathsPlugin() : null,
      _DEV
        ? new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            // show a warning when there is a circular dependency
            failOnError: false,
          })
        : null,
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: true,
      }),
    ].filter(Boolean),
  };
  return nodeConfig;
};
