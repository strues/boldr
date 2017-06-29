/* eslint-disable max-lines, prefer-template */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ifElse = require('boldr-utils/lib/logic/ifElse');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = require('../config');
const happyPackPlugin = require('./plugins/happyPackPlugin');
const WebpackDigestHash = require('./plugins/ChunkHash');
const ChunkNames = require('./plugins/ChunkNames');
const VerboseProgress = require('./plugins/VerboseProgress');

const LOCAL_IDENT = '[name]__[local]___[hash:base64:5]';
const EXCLUDES = [/node_modules/, config.assetsDir, config.serverCompiledDir];
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
      filename: _DEV ? '[name].js' : '[name]-[chunkhash].js',
      chunkFilename: _DEV ? '[name]-[hash].js' : '[name]-[chunkhash].js',
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
    profile: false,
    // Include polyfills and/or mocks for node features unavailable in browser
    // environments. These are typically necessary because package's will
    // occasionally include node only code.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    performance: {
      hints: _PROD ? 'warning' : false,
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
    },
    stats: {
      colors: true,
      reasons: config.isVerbose,
      hash: config.isVerbose,
      version: config.isVerbose,
      timings: true,
      chunks: config.isVerbose,
      cached: config.isVerbose,
      cachedAssets: config.isVerbose,
    },
    resolve: {
      // look for files in the descendants of src/ then node_modules
      modules: [config.srcDir, 'node_modules'],
      // Webpack will look for the following fields when searching for libraries
      mainFields: ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      descriptionFiles: ['package.json'],
      // We want files with the following extensions...
      extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
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
    // Locations Webpack should look for loaders.
    // You can also use the resolveLoader to resolve you're webpack 2/3 loaders
    // without the -loader
    resolveLoader: {
      modules: [config.nodeModules, config.srcDir],
      moduleExtensions: ['-loader'],
    },
    module: {
      strictExportPresence: true,
      // dont parse minimized files
      noParse: [/\.min\.js/],
      rules: [
        // js
        {
          test: /\.(js|jsx)$/,
          exclude: EXCLUDES,
          include: [config.srcDir],
          use: [
            ifDev({
              loader: 'cache-loader',
              options: {
                cacheDirectory: config.cacheDir,
              },
            }),
            { loader: 'happypack/loader?id=hp-js' },
          ].filter(Boolean),
        },
        // scss
        {
          test: /\.(scss|css)$/,
          include: config.srcDir,
          exclude: EXCLUDES,
          use: ExtractCssChunks.extract({
            use: [
              ifDev({
                loader: 'cache-loader',
                options: {
                  cacheDirectory: config.cacheDir,
                },
              }),
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  localIdentName: LOCAL_IDENT,
                  minimize: !_DEV,
                  // sourceMap: true,
                  modules: false,
                  context: config.rootDir,
                },
              },
              {
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
              },
              {
                loader: 'fast-sass-loader',
              },
            ].filter(Boolean),
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
          options: { limit: 10000, emitFile: true },
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
        ],
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'],
        filename: _DEV ? '[name].js' : '[name]-[chunkhash].js',
        minChunks: Infinity,
      }),
      new ExtractCssChunks({
        filename: _DEV ? '[name].css' : '[name].[contenthash:base62:8].css',
      }),
    ],
  };

  if (_DEV) {
    browserConfig.plugins.push(
      // Dont let errors stop our processes during development
      new webpack.NoEmitOnErrorsPlugin(),
      // Hot reloading
      new webpack.HotModuleReplacementPlugin(),
      // Detect modules with circular dependencies when bundling with webpack.
      // @see https://github.com/aackerman/circular-dependency-plugin
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: false,
      }),
      // Improve OS compatibility
      // @see https://github.com/Urthen/case-sensitive-paths-webpack-plugin
      new CaseSensitivePathsPlugin(),
      new webpack.NamedModulesPlugin(),
      // Dll reference speeds up development by grouping all of your vendor dependencies
      // in a DLL file. This is not compiled again, unless package.json contents
      // have changed.
      new webpack.DllReferencePlugin({
        context: config.rootDir,
        manifest: require(path.resolve(config.assetsDir, 'boldrDLLs.json')),
      }),
    );
  }
  if (_PROD) {
    browserConfig.plugins.push(
      new WebpackDigestHash(),
      // Use HashedModuleIdsPlugin to generate IDs that preserves over builds
      // @see https://github.com/webpack/webpack.js.org/issues/652#issuecomment-273324529
      // @NOTE: if using flushChunkNames rather than flushModuleIds you must disable this...
      new webpack.HashedModuleIdsPlugin(),
      new StatsPlugin('client-stats.json'),
      new UglifyPlugin({
        compress: true,
        mangle: true,
        comments: false,
        sourceMap: true,
      }),
    );
  }
  return browserConfig;
};
