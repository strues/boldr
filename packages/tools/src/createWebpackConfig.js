/* eslint-disable camelcase, eqeqeq, prefer-destructuring, max-lines, max-statements, complexity, import/max-dependencies*/
// @flow weak
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import AutoDllPlugin from 'autodll-webpack-plugin';
import BabelMinify from 'babel-minify-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { getHashDigest } from 'loader-utils';
import appRoot from '@boldr/utils/lib/node/appRoot';
import logger from '@boldr/utils/lib/logger';
import config from '@boldr/config';
import dotenv from 'dotenv';
import { StatsPlugin, happyPackPlugin, ProgressPlugin, WebpackDigestHash } from './plugins';

import rootModuleRelativePath from './util/rootModuleRelativePath';

import {
  REQUIRED_ENV_VARS,
  CACHE_HASH_TYPE,
  CACHE_DIGEST_TYPE,
  CACHE_DIGEST_LENGTH,
  JS_FILES,
  ASSET_FILES,
} from './constants';

dotenv.config();

function resolveOwn(relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}

const relativeResolve = rootModuleRelativePath(require);

const envParameters = Object.keys(process.env);
const missingParameters = REQUIRED_ENV_VARS.filter(key => !envParameters.includes(key));
if (missingParameters.length > 0) {
  throw new Error(
    `Missing environment parameters ${missingParameters.join(', ')}.\n` +
      `Hint: Please provide a proper .env file`,
  );
}

const defaults = {
  target: 'client',
  env: process.env.NODE_ENV,
};

const ROOT = appRoot.get();
const SERVER_ENTRY = path.resolve(ROOT, config.get('tools.paths.entry.server'));
const CLIENT_ENTRY = path.resolve(ROOT, config.get('tools.paths.entry.client'));
const SRC_DIR = path.resolve(ROOT, 'src');
const SERVER_OUTPUT = path.resolve(ROOT, config.get('tools.paths.output.server'));
const CLIENT_OUTPUT = path.resolve(ROOT, config.get('tools.paths.output.client'));
const PUBLIC_PATH = config.get('tools.paths.publicPath');

const DEV_GRAPHQL_ENDPOINT = process.env.DEV_GRAPHQL_ENDPOINT;
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const API_URL = process.env.API_URL;
const DEV_API_URL = process.env.DEV_API_URL;
const API_BUNDLE_TYPE = process.env.API_BUNDLE_TYPE;

export default function createWebpackConfig(
  options: ConfigurationOptions = {},
): Promise<Configuration> {
  const settings = { ...defaults, ...options };
  // process.env.NODE_ENV is typically set but still could be undefined. Fix that.
  if (settings.env === null) {
    settings.env = 'development';
  }

  const _IS_SERVER_ = settings.target === 'server';
  const _IS_CLIENT_ = settings.target === 'client';

  const _IS_DEV_ = settings.env === 'development';
  const _IS_PROD_ = settings.env === 'production';
  const webpackTarget = _IS_SERVER_ ? 'node' : 'web';

  const clientPreset = [
    require.resolve('babel-preset-boldr'),
    {
      useBuiltins: true,
      modules: false,
      faSpecMode: true,
      looseMode: true,
      specMode: false,
      nodentRt: false,
      polyfill: false,
      target: 'modern',
      imports: 'webpack',
      styled: true,
      enableIntl: false,
      verbose: false,
      srcDir: SRC_DIR,
    },
  ];
  const serverPreset = [
    require.resolve('babel-preset-boldr'),
    {
      useBuiltins: true,
      modules: false,
      faSpecMode: true,
      looseMode: true,
      specMode: false,
      nodentRt: false,
      imports: 'webpack',
      polyfill: false,
      target: 'current',
      styled: true,
      enableIntl: false,
      srcDir: SRC_DIR,
    },
  ];

  const PKG_JSON = require(path.resolve(ROOT, 'package.json'));
  const CACHE_HASH = getHashDigest(
    JSON.stringify(PKG_JSON),
    CACHE_HASH_TYPE,
    CACHE_DIGEST_TYPE,
    CACHE_DIGEST_LENGTH,
  );

  const name = _IS_CLIENT_ ? 'client' : 'server';
  const target = _IS_CLIENT_ ? 'web' : 'node';

  const devtool = _IS_DEV_ ? 'cheap-module-eval-source-map' : 'source-map';
  const BUNDLE_TYPE = settings.target.toUpperCase();

  logger.start(`${BUNDLE_TYPE} Configuration:`);
  // $FlowIssue
  logger.info(`Current Env: ${settings.env}`);
  logger.info(`Build Target: ${target}`);
  logger.info(`Source Maps: ${devtool}`);

  const CACHE_LOADER_DIRECTORY = path.resolve(
    ROOT,
    // $FlowIssue
    `node_modules/.cache/loader-${CACHE_HASH}-${settings.target}-${settings.env}`,
  );
  const cacheLoaderRule = {
    loader: require.resolve('cache-loader'),
    options: {
      cacheDirectory: CACHE_LOADER_DIRECTORY,
    },
  };

  const cssLoaderOptions = {
    modules: true,
    localIdentName: '[name]__[local]--[hash:base64:5]',
    import: 1,
    minimize: !_IS_DEV_,
    sourceMap: _IS_DEV_,
  };
  const cssLoaderSassOptions = {
    modules: false,
    localIdentName: '[name]__[local]--[hash:base64:5]',
    import: 2,
    minimize: !_IS_DEV_,
    sourceMap: _IS_DEV_,
  };
  const postCSSLoaderRule = {
    loader: require.resolve('postcss-loader'),
    options: {
      // https://webpack.js.org/guides/migrating/#complex-options
      ident: 'postcss',
      sourceMap: _IS_DEV_,
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 10'],
          flexbox: 'no-2009',
        }),
        require('postcss-import'),
        require('postcss-pxtorem'),
        require('postcss-nested'),
      ],
    },
  };
  const sassLoaderRule = {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: false,
      minimize: !_IS_DEV_,
    },
  };

  const HMR_MIDDLEWARE = `${require.resolve(
    'webpack-hot-middleware/client',
  )}?path=/__webpack_hmr&timeout=20000&reload=true&quiet=false&noInfo=true&overlay=false`;

  const externals = fs
    .readdirSync(path.resolve(ROOT, 'node_modules'))
    .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
    .reduce((externals, mod) => {
      externals[mod] = `commonjs ${mod}`;
      return externals;
    }, {});

  externals['react-dom/server'] = 'commonjs react-dom/server';

  const getClientEntry = () => {
    // For development
    let entry = [HMR_MIDDLEWARE, CLIENT_ENTRY];
    if (!_IS_DEV_) {
      entry = {
        main: CLIENT_ENTRY,
      };
    }

    return entry;
  };
  const getServerEntry = () => {
    const entry = { ssr: [SERVER_ENTRY] };
    return entry;
  };

  // $FlowIssue
  return {
    name,
    target,
    devtool,
    context: ROOT,
    bail: !_IS_DEV_,
    externals: _IS_SERVER_ ? externals : undefined,
    node: _IS_CLIENT_
      ? {
          dgram: 'empty',
          fs: 'empty',
          net: 'empty',
          tls: 'empty',
          // eslint-disable-next-line
          child_process: 'empty',
          __filename: true,
          __dirname: true,
        }
      : {
          console: false,
          global: false,
          process: false,
          Buffer: false,
          __filename: false,
          __dirname: false,
        },
    performance: _IS_DEV_
      ? false
      : {
          hints: 'warning',
        },
    entry: _IS_SERVER_ ? getServerEntry() : getClientEntry(),
    output: {
      libraryTarget: _IS_SERVER_ ? 'commonjs2' : 'var',
      filename: _IS_DEV_ || _IS_SERVER_ ? '[name].js' : '[name]-[chunkhash].js',
      chunkFilename: _IS_DEV_ || _IS_SERVER_ ? '[name].js' : '[name]-[chunkhash].js',
      path: _IS_SERVER_ ? SERVER_OUTPUT : CLIENT_OUTPUT,
      publicPath: PUBLIC_PATH,
      pathinfo: _IS_DEV_,
      // Enable cross-origin loading without credentials - Useful for loading files from CDN
      crossOriginLoading: 'anonymous',
      devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    },

    resolve: {
      extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
      descriptionFiles: ['package.json'],
      modules: [path.resolve(ROOT, './src'), path.resolve(ROOT, './node_modules'), 'node_modules'],
      mainFields: _IS_CLIENT_
        ? ['browser:modern', 'browser:esnext', 'web:modern', 'browser', 'module', 'main']
        : ['esnext:main', 'module:modern', 'main:modern', 'jsnext:main', 'module', 'main'],
      alias: {
        'babel-runtime': relativeResolve('babel-runtime/package.json'),
        immutable: path.resolve(ROOT, './node_modules/immutable/dist/immutable.js'),
      },
    },
    resolveLoader: {
      modules: [resolveOwn('node_modules'), path.resolve(ROOT, './node_modules')],
    },
    module: {
      // throws an error if an export is missing rather than a warning by default
      strictExportPresence: true,
      rules: [
        // References to images, fonts, movies, music, etc.
        {
          test: ASSET_FILES,
          loader: require.resolve('file-loader'),
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.(ts|tsx)$/,
            /\.(re)$/,
            /\.(s?css|sass)$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/,
          ],
          options: {
            name: _IS_PROD_ ? 'file-[hash:base62:8].[ext]' : '[name].[ext]',
            emitFile: _IS_CLIENT_,
          },
        },
        // JSON
        {
          test: /\.json$/,
          loader: require.resolve('json-loader'),
        },
        // GraphQL
        {
          test: /\.(graphql|gql)$/,
          include: SRC_DIR,
          loader: require.resolve('graphql-tag/loader'),
        },
        // JS
        {
          test: JS_FILES,
          include: SRC_DIR,
          use: [
            cacheLoaderRule,
            {
              loader: `happypack/loader?id=hp-js`,
            },
          ].filter(Boolean),
        },
        // Sass
        {
          test: /\.css$/,
          use: _IS_CLIENT_
            ? ExtractCssChunks.extract({
                use: [
                  cacheLoaderRule,
                  {
                    loader: require.resolve('css-loader'),
                    options: cssLoaderOptions,
                  },
                  postCSSLoaderRule,
                  sassLoaderRule,
                ].filter(Boolean),
              })
            : [
                cacheLoaderRule,
                {
                  loader: require.resolve('css-loader/locals'),
                  options: cssLoaderOptions,
                },
                postCSSLoaderRule,
              ].filter(Boolean),
        },
        {
          test: /\.scss$/,
          include: SRC_DIR,
          use: _IS_CLIENT_
            ? ExtractCssChunks.extract({
                use: [
                  cacheLoaderRule,
                  {
                    loader: require.resolve('css-loader'),
                    options: cssLoaderSassOptions,
                  },
                  postCSSLoaderRule,
                  sassLoaderRule,
                ].filter(Boolean),
              })
            : [
                cacheLoaderRule,
                {
                  loader: require.resolve('css-loader/locals'),
                  options: cssLoaderSassOptions,
                },
                postCSSLoaderRule,
                sassLoaderRule,
              ].filter(Boolean),
        },
      ].filter(Boolean),
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(_IS_DEV_),
        __SERVER__: JSON.stringify(_IS_SERVER_),
        __PUB_PATH__: JSON.stringify(PUBLIC_PATH),
        __CLIENT__: _IS_CLIENT_,
        'process.env.NODE_ENV': JSON.stringify(options.env),
        'process.env.TARGET': JSON.stringify(webpackTarget),
        'process.env.GRAPHQL_ENDPOINT': _IS_DEV_
          ? JSON.stringify(DEV_GRAPHQL_ENDPOINT)
          : JSON.stringify(GRAPHQL_ENDPOINT),
        'process.env.API_URL': _IS_DEV_ ? JSON.stringify(DEV_API_URL) : JSON.stringify(API_URL),
        'process.env.API_BUNDLE_TYPE': JSON.stringify(API_BUNDLE_TYPE),
        'process.env.BUILD_TARGET': JSON.stringify(webpackTarget),
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: _IS_PROD_,
        debug: !_IS_PROD_,
        context: ROOT,
      }),
      // eslint-disable-next-line
      happyPackPlugin({
        name: 'hp-js',
        loaders: [
          {
            path: require.resolve('babel-loader'),
            query: {
              babelrc: false,
              cacheDirectory: _IS_DEV_,
              compact: _IS_PROD_,
              presets: [_IS_CLIENT_ ? clientPreset : serverPreset],
            },
          },
        ],
      }),

      // Improve OS compatibility
      // https://github.com/Urthen/case-sensitive-paths-webpack-plugin
      new CaseSensitivePathsPlugin(),

      _IS_DEV_
        ? new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            // show a warning when there is a circular dependency
            failOnError: false,
          })
        : null,

      _IS_DEV_
        ? new WriteFilePlugin({
            exitOnErrors: false,
            log: true,
            // required not to cache removed files
            useHashIndex: false,
          })
        : null,

      _IS_CLIENT_ ? new ExtractCssChunks() : null,

      _IS_SERVER_ ? new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }) : null,
      _IS_PROD_ ? new webpack.optimize.ModuleConcatenationPlugin() : null,

      // "Use HashedModuleIdsPlugin to generate IDs that preserves over builds."
      // @see: https://github.com/webpack/webpack.js.org/issues/652#issuecomment-273324529
      _IS_PROD_ && _IS_CLIENT_ ? new webpack.HashedModuleIdsPlugin() : null,
      // Extract Webpack bootstrap code with knowledge about chunks into separate cachable package.
      // explicit-webpack-runtime-chunk
      _IS_CLIENT_ && _IS_PROD_
        ? new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
          })
        : null,
      // Extract Webpack bootstrap code with knowledge about chunks into separate cachable package.
      // explicit-webpack-runtime-chunk
      _IS_CLIENT_
        ? new webpack.optimize.CommonsChunkPlugin({
            names: 'bootstrap',
            //   // needed to put webpack bootstrap code before chunks
            filename: _IS_DEV_ ? '[name].js' : '[name]-[chunkhash].js',
            minChunks: Infinity,
          })
        : null,

      _IS_PROD_ && _IS_CLIENT_ ? new WebpackDigestHash() : null,

      _IS_PROD_ && _IS_CLIENT_ ? new BabelMinify({}, { comments: false }) : null,
      _IS_PROD_ && _IS_SERVER_
        ? new BabelMinify(
            {
              booleans: false,
              deadcode: true,
              flipComparisons: false,
              mangle: false,
              mergeVars: false,
            },
            { comments: false },
          )
        : null,

      // Let the server side renderer know about our client side assets
      // https://github.com/FormidableLabs/webpack-stats-plugin
      _IS_PROD_ && _IS_CLIENT_ ? new StatsPlugin('stats.json') : null,
      // I would recommend using NamedModulesPlugin during development (better output).
      // @see: https://github.com/webpack/webpack.js.org/issues/652#issuecomment-273023082
      _IS_DEV_ ? new webpack.NamedModulesPlugin() : null,
      // @see: https://webpack.js.org/plugins/hot-module-replacement-plugin/
      _IS_CLIENT_ && _IS_DEV_ ? new webpack.HotModuleReplacementPlugin() : null,
      // skip the emitting phase whenever there are errors while compiling
      // @see: https://webpack.js.org/plugins/no-emit-on-errors-plugin/
      _IS_DEV_ ? new webpack.NoEmitOnErrorsPlugin() : null,
      _IS_PROD_ && _IS_CLIENT_
        ? new CopyWebpackPlugin([
            { from: '.env', to: path.resolve(ROOT, 'build') },
            { from: 'package.json', to: path.resolve(ROOT, 'build') },
            { from: '.boldr', to: path.resolve(ROOT, 'build/.boldr') },
            { from: 'public', to: path.resolve(ROOT, 'build/public') },
            { from: 'Dockerfile', to: path.resolve(ROOT, 'build') },
            { from: 'docker-compose.yml', to: path.resolve(ROOT, 'build') },
            { from: 'Dockerfile', to: path.resolve(ROOT, 'build') },
            { from: 'README.md', to: path.resolve(ROOT, 'build') },
          ])
        : null,
      // Dll reference speeds up development by grouping all of your vendor dependencies
      // in a DLL file. This is not compiled again, unless package.json contents
      // have changed.
      _IS_DEV_ && _IS_CLIENT_
        ? new AutoDllPlugin({
            context: ROOT,
            filename: 'boldrDLLs.js',
            entry: {
              vendor: config.get('tools.vendor'),
            },
          })
        : null,

      process.stdout.isTTY
        ? new ProgressPlugin({
            prefix: BUNDLE_TYPE,
          })
        : null,

      _IS_CLIENT_ && _IS_PROD_
        ? new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
            analyzerMode: 'static',
            defaultSizes: 'gzip',
            logLevel: 'silent',
            openAnalyzer: false,
            reportFilename: 'report.html',
          })
        : null,

      // Analyse bundle in production
      _IS_SERVER_ && _IS_PROD_
        ? new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
            analyzerMode: 'static',
            defaultSizes: 'parsed',
            logLevel: 'silent',
            openAnalyzer: false,
            reportFilename: 'report.html',
          })
        : null,
    ].filter(Boolean),
  };
}
