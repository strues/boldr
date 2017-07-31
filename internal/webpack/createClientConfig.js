/* eslint-disable max-lines, prefer-template */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
const appRoot = require('boldr-utils/lib/node/appRoot');
const filterEmpty = require('boldr-utils/lib/objects/filterEmpty');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ifElse = require('boldr-utils/lib/logic/ifElse');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const YarnAddWebpackPlugin = require('yarn-add-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaderUtils = require('loader-utils');
const WriteFilePlugin = require('write-file-webpack-plugin');
const config = require('../config');
const happyPackPlugin = require('./plugins/happyPackPlugin');
const WebpackDigestHash = require('./plugins/ChunkHash');
const ChunkNames = require('./plugins/ChunkNames');
const VerboseProgress = require('./plugins/VerboseProgress');

const LOCAL_IDENT = '[local]-[hash:base62:8b';
const EXCLUDES = [/node_modules/, config.assetsDir, config.serverCompiledDir];
const CACHE_HASH_TYPE = 'sha256';
const CACHE_DIGEST_TYPE = 'base62';
const CACHE_DIGEST_LENGTH = 4;
const ASSET_FILES = /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf|html|ico)$/;
const JS_FILES = /\.(js|jsx)$/;
const STYLE_FILES = /\.(css|scss)$/;

const cssLoaderOptions = {
  modules: false,
  localIdentName: LOCAL_IDENT,
  importLoaders: 2,
  minimize: false,
  sourceMap: false,
};

const postCSSLoaderRule = {
  loader: 'postcss-loader',
  options: {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    parser: 'postcss-scss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        browsers: ['> 1%', 'last 2 versions'],
        flexbox: 'no-2009',
      }),
      require('postcss-discard-duplicates'),
    ],
  },
};

const PKG = require(path.resolve(appRoot.get(), 'package.json'));

const CACHE_HASH = loaderUtils.getHashDigest(
  JSON.stringify(PKG),
  CACHE_HASH_TYPE,
  CACHE_DIGEST_TYPE,
  CACHE_DIGEST_LENGTH,
);
const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(
      config.cacheDir,
      `loader-${CACHE_HASH}-client-${process.env.NODE_ENV}`,
    ),
  },
};

dotenv.load();

module.exports = function createClientConfig(options) {
  const _DEV = process.env.NODE_ENV === 'development';
  const _PROD = process.env.NODE_ENV === 'production';

  const ifDev = ifElse(_DEV);

  const getEntry = () => {
    // For development
    let entry = {
      main: [
        'react-hot-loader/patch',
        `webpack-hot-middleware/client?path=http://localhost:${config.serverPort}/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false`,
        `${config.srcDir}/core/entry/client.js`,
      ],
    };
    // For production
    if (!_DEV) {
      entry = {
        main: `${config.srcDir}/core/entry/client.js`,
        vendor: config.vendorFiles,
      };
    }

    return entry;
  };
  const browserConfig = {
    name: 'client',
    // pass either node or web
    target: 'web',
    // user's project root
    context: config.rootDir,
    // sourcemap
    devtool: _DEV ? 'cheap-module-eval-source-map' : 'source-map',
    entry: getEntry(),
    output: {
      // build/assets/*
      path: config.assetsDir,
      filename: _DEV ? '[name].js' : '[name].[chunkhash].js',
      chunkFilename: _DEV ? '[name].js' : '[name]-[chunkhash].js',
      // Full URL in dev otherwise we expect our bundled output to be served from /assets/
      publicPath: '/assets/',
      // only dev
      pathinfo: _DEV,
      libraryTarget: 'var',
      crossOriginLoading: 'anonymous',
      devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    },
    // fail on err
    bail: _PROD,
    // cache dev
    // Cache the generated webpack modules and chunks to improve build speed.
    cache: _DEV,
    // true if prod & enabled in settings
    // eslint-disable-next-line eqeqeq
    profile: process.env.ENABLE_PROFILE === '1',
    // Include polyfills and/or mocks for node features unavailable in browser
    // environments. These are typically necessary because package's will
    // occasionally include node only code.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dgram: 'empty',
    },
    performance: {
      hints: _PROD ? 'warning' : false,
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
    },

    resolve: {
      // look for files in the descendants of src/ then node_modules
      modules: ['node_modules', path.resolve(appRoot.get(), './node_modules')],
      // Webpack will look for the following fields when searching for libraries
      mainFields: ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      descriptionFiles: ['package.json'],
      // We want files with the following extensions...
      extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
      alias: filterEmpty({
        '@@scenes': path.resolve(config.srcDir, 'scenes'),
        '@@state': path.resolve(config.srcDir, 'state'),
        '@@admin': path.resolve(config.srcDir, 'scenes/Admin'),
        '@@blog': path.resolve(config.srcDir, 'scenes/Blog'),
        '@@components': path.resolve(config.srcDir, 'components'),
        '@@core': path.resolve(config.srcDir, 'core'),
        '@@theme': path.resolve(config.srcDir, 'theme'),
        'styled-components': _PROD
          ? path.resolve(appRoot.get(), './node_modules/styled-components/package.json')
          : null,
        'hoist-non-react-statics': _PROD
          ? path.resolve(appRoot.get(), './node_modules/hoist-non-react-statics/package.json')
          : null,
        'apollo-client': path.resolve(appRoot.get(), './node_modules/apollo-client/package.json'),
        immutable: _PROD
          ? path.resolve(appRoot.get(), './node_modules/immutable/package.json')
          : null,
      }),
    },

    module: {
      strictExportPresence: true,
      // dont parse minimized files
      noParse: [/\.min\.js/],
      rules: [
        // js
        {
          test: JS_FILES,
          exclude: EXCLUDES,
          include: [config.srcDir],
          use: [cacheLoader, { loader: 'happypack/loader?id=hp-js' }],
        },
        // scss
        {
          test: /\.(scss|css)$/,
          include: config.srcDir,
          exclude: EXCLUDES,
          use: ExtractCssChunks.extract({
            use: [
              cacheLoader,
              {
                loader: 'css-loader',
                options: cssLoaderOptions,
              },
              postCSSLoaderRule,
              {
                loader: 'fast-sass-loader',
              },
            ],
          }),
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
          options: { limit: 10000, emitFile: true, name: 'media/[name].[hash:8].[ext]' },
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
            emitFile: true,
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
      new WriteFilePlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: _PROD,
        debug: _DEV,
        context: config.rootDir,
      }),
      // EnvironmentPlugin is essentially DefinePlugin but allows you to
      // forgo the process.env. when defining.
      // Anything placed in EnvironmentPlugin / DefinePlugin will be
      // inlined when compiled with Webpack.
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        GRAPHQL_ENDPOINT: JSON.stringify(process.env.GRAPHQL_ENDPOINT),
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(_DEV),
        __SERVER__: JSON.stringify(false),
        __CLIENT__: JSON.stringify(true),
      }),
      // Custom progress plugin
      new VerboseProgress({ prefix: 'Client' }),

      // Automatically assign quite useful and matching chunk names based on file names.
      // new ChunkNames({ debug: process.env.LOG_CHUNKNAMES === '1' }),
        // _DEV ? new webpack.NamedModulesPlugin() : null,
      new SriPlugin({
        hashFuncNames: ['sha256', 'sha512'],
        enabled: _PROD,
      }),
      // _DEV
      //   ? new YarnAddWebpackPlugin({
      //       peerDependencies: true,
      //     })
      //   : null,
      _PROD
        ? new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(config.srcDir, 'core/index.ejs'),
          })
        : null,
      // Detect modules with circular dependencies when bundling with webpack.
      // @see https://github.com/aackerman/circular-dependency-plugin
      _DEV
        ? new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: false,
          })
        : null,
      // Improve OS compatibility
      // @see https://github.com/Urthen/case-sensitive-paths-webpack-plugin
      _DEV ? new CaseSensitivePathsPlugin() : null,
      _DEV ? new webpack.NamedModulesPlugin() : null,
      /**
       * HappyPack Plugins are used as caching mechanisms to reduce the amount
       * of time Webpack spends rebuilding, during your bundling during
       * development.
       * @see https://github.com/amireh/happypack for more info
       * @type {String}   The HappyPack loader id
       */
      happyPackPlugin({
        name: 'hp-js',
        loaders: [
          {
            path: 'babel-loader',
            query: {
              babelrc: false,
              compact: _PROD,
              sourceMaps: true,
              comments: false,
              cacheDirectory: !_DEV,
              presets: [
                [
                  'babel-preset-boldr/browser',
                  {
                    useBuiltins: true,
                    modules: false,
                    exclude: ['transform-regenerator', 'transform-async-to-generator'],
                    targets: {
                      uglify: !_DEV,
                      browsers: ['> .5% in US', 'last 1 versions'],
                    },
                  },
                ],
              ],
            },
          },
        ],
      }),
      new ExtractCssChunks({
        filename: _DEV ? '[name].css' : '[name].[contenthash:base62:8].css',
      }),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'],
        filename: _DEV ? '[name].js' : '[name]-[chunkhash].js',
        minChunks: Infinity,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",

        // With more entries, this ensures that no other module goes into the vendor chunk
        minChunks: Infinity
      }),
      // Hot reloading
      _DEV ? new webpack.HotModuleReplacementPlugin() : null,

      // Dll reference speeds up development by grouping all of your vendor dependencies
      // in a DLL file. This is not compiled again, unless package.json contents
      // have changed.
      // _DEV
      //   ? new webpack.DllReferencePlugin({
      //       context: config.rootDir,
      //       manifest: require(path.resolve(config.assetsDir, 'boldrDLLs.json')),
      //     })
      //   : null,

      // Supress errors to console
      _DEV ? new webpack.NoEmitOnErrorsPlugin() : null,

      _PROD
        ? new StatsPlugin('client-stats.json', {
            chunkModules: true,
            // eslint-disable-next-line
            exclude: [/node_modules[\\\/]react/],
          })
        : null,

      _PROD ? new UglifyPlugin() : null,
      _PROD ? new webpack.optimize.ModuleConcatenationPlugin() : null,
      _PROD ? new WebpackDigestHash() : null,
      // Use HashedModuleIdsPlugin to generate IDs that preserves over builds
      // @see https://github.com/webpack/webpack.js.org/issues/652#issuecomment-273324529
      // @NOTE: if using flushChunkNames rather than flushModuleIds you must disable this...
      _PROD ? new webpack.HashedModuleIdsPlugin() : null,
    ].filter(Boolean),
  };
  return browserConfig;
};
