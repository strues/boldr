/* eslint-disable camelcase, eqeqeq, prefer-destructuring, max-lines, max-statements */
// @flow
import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import SriPlugin from 'webpack-subresource-integrity';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyPlugin from 'uglifyjs-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { getHashDigest } from 'loader-utils';
import appRoot from '@boldr/utils/lib/node/appRoot';
import logger from '@boldr/utils/lib/logger';
import dotenv from 'dotenv';
import StatsPlugin from './plugins/StatsPlugin';
import HappyPackPlugin from './plugins/happyPackPlugin';
import ProgressPlugin from './plugins/ProgressPlugin';
import WebpackDigestHash from './plugins/ChunkHash';

dotenv.config();

function resolveOwn(relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}
const CACHE_HASH_TYPE = 'sha256';
const CACHE_DIGEST_TYPE = 'base62';
const CACHE_DIGEST_LENGTH = 4;

const JS_FILES = /\.(js|mjs|jsx)$/;
const STYLE_FILES = /\.(css|scss|pcss)$/;
const ASSET_FILES = /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf|html|ico)$/;
const UGLIFY_OPTIONS = {
  compress: {
    unsafe_math: true,
    unsafe_proto: true,
    // good for chrome performance
    keep_infinity: true,
    // try hard to use less code
    passes: 2,
  },
  output: {
    // fix for problematic code like emoticons
    ascii_only: true,
    // more readable output
    semicolons: false,
    comments: false,
  },
};

const REQUIRED_ENV_VARS = [
  'SERVER_OUTPUT',
  'CLIENT_OUTPUT',
  'PUBLIC_PATH',
  'API_PREFIX',
  'API_URL',
  'GRAPHQL_ENDPOINT',
  'HTML_TEMPLATE',
  'DEV_PORT',
];

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
  verbose: false,
  useSourceMaps: true,
  minifier: 'uglify',
};

const ROOT = appRoot.get();
const SERVER_ENTRY = path.resolve(ROOT, 'src/serverEntry.js');
const CLIENT_ENTRY = path.resolve(ROOT, 'src/clientEntry.js');
const CLIENT_VENDOR = path.resolve(ROOT, 'src/vendor.js');
const SERVER_OUTPUT = path.resolve(ROOT, process.env.SERVER_OUTPUT);
const CLIENT_OUTPUT = path.resolve(ROOT, process.env.CLIENT_OUTPUT);
const PUBLIC_PATH = process.env.PUBLIC_PATH;
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const API_URL = process.env.API_URL;
const API_PREFIX = process.env.API_PREFIX;
const HTML_TEMPLATE = path.resolve(ROOT, process.env.HTML_TEMPLATE);

const nodeModules = path.resolve(ROOT, 'node_modules');
const serverExternals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, request) => {
    externals[request] = `commonjs ${request}`;
    return externals;
  }, {});

serverExternals['react-dom/server'] = 'commonjs react-dom/server';

export default function createWebpackConfig(
  options: ConfigurationOptions = {},
): Promise<Configuration> {
  const config = { ...defaults, ...options };
  // process.env.NODE_ENV is typically set but still could be undefined. Fix that.
  if (config.env === null) {
    config.env = 'development';
  }
  const platform = config.target === 'node' ? 'server' : 'browser';
  const _IS_SERVER_ = config.target === 'server';
  const _IS_CLIENT_ = config.target === 'client';

  const _IS_DEV_ = config.env === 'development';
  const _IS_PROD_ = config.env === 'production';

  const BABEL_ENV = `boldr-${config.env}-${config.target}`;
  const clientPreset = [
    require.resolve('babel-preset-boldr/browser'),
    {
      useBuiltins: true,
      modules: false,
      faSpecMode: true,
      nodentRt: false,
      exclude: ['transform-regenerator', 'transform-async-to-generator'],
      targets: {
        uglify: !_IS_DEV_,
        browsers: ['> .5% in US', 'last 1 versions'],
      },
    },
  ];
  const serverPreset = [
    require.resolve('babel-preset-boldr/node'),
    {
      useBuiltins: true,
      modules: false,
      faSpecMode: true,
      nodentRt: false,
      exclude: ['transform-regenerator', 'transform-async-to-generator'],
      targets: {
        node: 'current',
      },
    },
  ];
  const PROJECT_CONFIG = require(path.resolve(ROOT, 'package.json'));
  const CACHE_HASH = getHashDigest(
    JSON.stringify(PROJECT_CONFIG),
    CACHE_HASH_TYPE,
    CACHE_DIGEST_TYPE,
    CACHE_DIGEST_LENGTH,
  );
  const PREFIX = config.target.toUpperCase();
  const CACHE_LOADER_DIRECTORY = path.resolve(
    ROOT,
    `node_modules/.cache/loader-${CACHE_HASH}-${config.target}-${config.env}`,
  );
  const UFLIFY_CACHE_DIRECTORY = path.resolve(
    ROOT,
    `node_modules/.cache/uglify-${CACHE_HASH}-${config.target}-${config.env}`,
  );

  const name = _IS_CLIENT_ ? 'client' : 'server';
  const target = _IS_CLIENT_ ? 'web' : 'node';

  const devtool = _IS_DEV_ ? 'cheap-module-source-map' : 'source-map';

  logger.info(`${PREFIX} Configuration:`);
  logger.info(`→ Environment: ${config.env}`);
  logger.info(`→ Build Target: ${target}`);
  logger.info(`→ Babel Environment: ${BABEL_ENV}`);
  logger.log(`→ Source Maps: ${devtool}`);

  const cacheLoader = config.useCacheLoader
    ? {
        loader: require.resolve('cache-loader'),
        options: {
          cacheDirectory: CACHE_LOADER_DIRECTORY,
        },
      }
    : null;

  const cssLoaderOptions = {
    modules: false,
    localIdentName: '[local]-[hash:base62:8]',
    import: 2,
    minimize: false,
    sourceMap: false,
  };

  const postCSSLoaderRule = {
    loader: require.resolve('postcss-loader'),
    query: {
      sourceMap: false,
    },
  };
  const sassLoaderRule = {
    loader: require.resolve('sass-loader'),
  };
  const getClientEntry = () => {
    // For development
    let entry = [
      `${require.resolve(
        'webpack-hot-middleware/client',
      )}?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false`,
      CLIENT_ENTRY,
    ];
    if (!_IS_DEV_) {
      entry = {
        main: CLIENT_ENTRY,
        vendor: CLIENT_VENDOR,
      };
    }

    return entry;
  };
  const getServerEntry = () => {
    const entry = [require.resolve('node-fetch'), SERVER_ENTRY];
    return entry;
  };

  return {
    name,
    target,
    devtool,
    context: ROOT,
    bail: !_IS_DEV_,
    externals: _IS_SERVER_ ? serverExternals : undefined,
    node: {
      console: true,
      __filename: true,
      __dirname: true,
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
      // Enable cross-origin loading without credentials - Useful for loading files from CDN
      crossOriginLoading: 'anonymous',
      devtoolModuleFilenameTemplate: _IS_DEV_
        ? info => path.resolve(info.absoluteResourcePath)
        : info => path.resolve(ROOT, info.absoluteResourcePath),
    },

    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      mainFields: [
        `esnext:${platform}`,
        `jsnext:${platform}`,
        platform,
        'esnext',
        'jsnext',
        'esnext:main',
        'jsnext:main',
        'module',
        'main',
      ],
      modules: ['node_modules', path.resolve(ROOT, './node_modules')],
    },
    resolveLoader: {
      modules: [resolveOwn('node_modules'), path.resolve(ROOT, './node_modules')],
    },
    module: {
      strictExportPresence: true,
      rules: [
        // References to images, fonts, movies, music, etc.
        {
          test: ASSET_FILES,
          loader: require.resolve('file-loader'),
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
          loader: require.resolve('graphql-tag/loader'),
        },
        // JS
        {
          test: JS_FILES,
          exclude: /node_modules/,
          use: [
            cacheLoader,
            {
              loader: `happypack/loader?id=hp-js`,
            },
          ].filter(Boolean),
        },
        // Sass
        {
          test: STYLE_FILES,
          use: _IS_CLIENT_
            ? ExtractCssChunks.extract({
                use: [
                  cacheLoader,
                  {
                    loader: require.resolve('css-loader'),
                    options: cssLoaderOptions,
                  },
                  postCSSLoaderRule,
                  sassLoaderRule,
                ].filter(Boolean),
              })
            : [
                cacheLoader,
                {
                  loader: require.resolve('css-loader/locals'),
                  options: cssLoaderOptions,
                },
                postCSSLoaderRule,
                sassLoaderRule,
              ].filter(Boolean),
        },
      ].filter(Boolean),
    },
    plugins: [
      new webpack.DefinePlugin({
        __SERVER__: JSON.stringify(_IS_SERVER_),
        'process.env': {
          NODE_ENV: JSON.stringify(options.env),
          TARGET: JSON.stringify(target),
          GRAPHQL_ENDPOINT: JSON.stringify(GRAPHQL_ENDPOINT),
          API_URL: JSON.stringify(API_URL),
          API_PREFIX: JSON.stringify(API_PREFIX),
        },
      }),
      // Subresource Integrity (SRI) is a security feature that enables browsers to verify that
      // files they fetch (for example, from a CDN) are delivered without unexpected manipulation.
      // https://www.npmjs.com/package/webpack-subresource-integrity
      // Browser-Support: http://caniuse.com/#feat=subresource-integrity
      new SriPlugin({
        hashFuncNames: ['sha256', 'sha512'],
        enabled: _IS_PROD_ && _IS_CLIENT_,
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: _IS_PROD_,
        debug: !_IS_PROD_,
        context: ROOT,
      }),
      // eslint-disable-next-line
      HappyPackPlugin({
        name: 'hp-js',
        loaders: [
          {
            path: require.resolve('babel-loader'),
            query: {
              babelrc: false,
              forceEnv: BABEL_ENV,
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
            log: true,
          })
        : null,
      new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
      // Let the server side renderer know about our client side assets
      // https://github.com/FormidableLabs/webpack-stats-plugin
      _IS_PROD_ && _IS_CLIENT_ ? new StatsPlugin('stats.json') : null,

      // Classic UglifyJS for compressing ES5 compatible code.
      // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
      config.minifier === 'uglify' && _IS_PROD_ && _IS_CLIENT_
        ? new UglifyPlugin({
            uglifyOptions: UGLIFY_OPTIONS,
            parallel: {
              cache: UFLIFY_CACHE_DIRECTORY,
            },
          })
        : null,
      // "Use HashedModuleIdsPlugin to generate IDs that preserves over builds."
      // Via: https://github.com/webpack/webpack.js.org/issues/652#issuecomment-273324529
      _IS_PROD_ ? new webpack.HashedModuleIdsPlugin() : null,

      // I would recommend using NamedModulesPlugin during development (better output).
      // Via: https://github.com/webpack/webpack.js.org/issues/652#issuecomment-273023082
      _IS_DEV_ ? new webpack.NamedModulesPlugin() : null,
      // Generating static HTML page for simple static deployment
      // https://github.com/jantimon/html-webpack-plugin
      _IS_PROD_ && _IS_CLIENT_
        ? new HtmlWebpackPlugin({
            template: HTML_TEMPLATE,
          })
        : null,

      _IS_CLIENT_
        ? new ExtractCssChunks({
            filename: _IS_DEV_ ? '[name].css' : '[name]-[contenthash:base62:8].css',
          })
        : null,

      _IS_SERVER_ ? new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }) : null,
      _IS_PROD_ && _IS_CLIENT_ ? new WebpackDigestHash() : null,
      // Extract Webpack bootstrap code with knowledge about chunks into separate cachable package.
      _IS_CLIENT_
        ? new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'],

            //   // needed to put webpack bootstrap code before chunks
            filename: _IS_PROD_ ? '[name]-[chunkhash].js' : '[name].js',
            minChunks: Infinity,
          })
        : null,
      _IS_PROD_ ? new webpack.optimize.ModuleConcatenationPlugin() : null,

      _IS_CLIENT_ && _IS_DEV_ ? new webpack.HotModuleReplacementPlugin() : null,
      _IS_DEV_ ? new webpack.NoEmitOnErrorsPlugin() : null,
      _IS_DEV_ && _IS_CLIENT_
        ? new webpack.DllReferencePlugin({
            context: ROOT,
            manifest: require(path.resolve(CLIENT_OUTPUT, 'boldrDLLs.json')),
          })
        : null,
      new ProgressPlugin({
        prefix: PREFIX,
      }),
    ].filter(Boolean),
  };
}
