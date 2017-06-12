/* eslint-disable max-lines, prefer-template */

import path from 'path';
import _debug from 'debug';
import chalk from 'chalk';
import fs from 'mz/fs';
import webpack from 'webpack';
import removeNil from 'boldr-utils/lib/arrays/removeNil';
import ifElse from 'boldr-utils/lib/logic/ifElse';
import mergeDeep from 'boldr-utils/lib/objects/mergeDeep';
import filterEmpty from 'boldr-utils/lib/objects/filterEmpty';
import appRoot from 'boldr-utils/lib/node/appRoot';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

import PATHS from '../../config/paths';
import happyPackPlugin from './plugins/happyPackPlugin';
import LoggerPlugin from './plugins/LoggerPlugin';
import { postCssConfig } from './util/helpers';
import baseWebpackConfig from './baseWebpackConfig';

const debug = _debug('boldr:dx:webpack:createBrowserWebpack');

const LOCAL_IDENT = '[name]__[local]___[hash:base64:5]';
const CWD = appRoot.get();
const prefetches = [];

const prefetchPlugins = prefetches.map(specifier => new webpack.PrefetchPlugin(specifier));

const cache = {
  'client-production': {},
  'client-development': {},
};

export default function createBrowserWebpack(
  { config, mode = 'development', name = 'client' } = {},
) {
  const { env: envVariables, bundle } = config;

  process.env.BABEL_ENV = mode;

  const _DEV = mode === 'development';
  const _PROD = mode === 'production';

  const ifDev = ifElse(_DEV);
  const ifProd = ifElse(_PROD);

  const BOLDR_DEV_PORT = parseInt(envVariables.BOLDR_DEV_PORT, 10) || 3001;

  const EXCLUDES = [
    /node_modules/,
    bundle.client.bundleDir,
    bundle.server.bundleDir,
    bundle.publicDir,
  ];

  const browserConfig = {
    // pass either node or web
    target: 'web',
    // user's project root
    context: baseWebpackConfig.context,
    // sourcemap
    devtool: _DEV ? 'cheap-eval-source-map' : 'source-map',
    entry: filterEmpty({
      app: removeNil([
        ifDev(require.resolve('react-hot-loader/patch')),
        `${require.resolve(
          'webpack-hot-middleware/client',
        )}?path=http://localhost:${BOLDR_DEV_PORT}/__webpack_hmr&timeout=3000`,
        require.resolve('./polyfills/browser'),
        bundle.client.entry,
      ]),
      vendor: ifProd(bundle.vendor),
    }),
    output: {
      path: bundle.client.bundleDir,
      filename: _DEV ? '[name].js' : '[name]-[chunkhash].js',
      chunkFilename: _DEV ? '[name]-[hash].js' : '[name]-[chunkhash].js',
      publicPath: ifDev(
        `http://localhost:${BOLDR_DEV_PORT}/`,
        // Otherwise we expect our bundled output to be served from this path.
        bundle.webPath,
      ),
      // only dev
      pathinfo: _DEV,
      libraryTarget: 'var',
      strictModuleExceptionHandling: true,
    },
    // true if prod
    bail: baseWebpackConfig.bail,
    // cache dev
    cache: baseWebpackConfig.cache,
    // true if prod & enabled in settings
    profile: _PROD && bundle.wpProfile,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      console: true,
      __filename: true,
      __dirname: true,
    },
    performance: false,
    stats: {
      colors: true,
      reasons: bundle.debug,
      hash: bundle.verbose,
      version: bundle.verbose,
      timings: true,
      chunks: bundle.verbose,
      chunkModules: bundle.verbose,
      cached: bundle.verbose,
      cachedAssets: bundle.verbose,
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: ['node_modules', PATHS.projectNodeModules].concat(PATHS.nodePaths),
      mainFields: ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      descriptionFiles: ['package.json'],
      alias: {
        '~scenes': PATHS.scenesDir,
        '~state': PATHS.stateDir,
        '~admin': PATHS.adminDir,
        '~blog': PATHS.blogDir,
        '~components': PATHS.componentsDir,
        '~core': PATHS.coreDir,
        '~templates': PATHS.tmplDir,
      },
    },
    resolveLoader: {
      modules: [PATHS.boldrNodeModules, PATHS.projectNodeModules],
    },
    module: {
      noParse: [/\.min\.js/],
      rules: removeNil([
        // js
        {
          test: /\.(js|jsx)$/,
          include: bundle.srcDir,
          exclude: EXCLUDES,
          use: removeNil([
            ifDev({
              loader: 'cache-loader',
              options: {
                // provide a cache directory where cache items should be stored
                cacheDirectory: PATHS.cacheDir,
              },
            }),
            'happypack/loader?id=hp-js',
          ]),
        },
        // css
        {
          test: /\.css$/,
          exclude: EXCLUDES,
          use: _DEV
            ? [{ loader: 'happypack/loader?id=hp-css' }]
            : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      modules: bundle.cssModules,
                      minimize: true,
                      autoprefixer: false,
                      importLoaders: 1,
                      context: bundle.srcDir,
                      localIdentName: '[hash:base64:5]',
                    },
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      // https://webpack.js.org/guides/migrating/#complex-options
                      ident: 'postcss',
                      plugins: postCssConfig,
                    },
                  },
                ],
              }),
        },
        // scss
        {
          test: /\.scss$/,
          exclude: EXCLUDES,
          use: _DEV
            ? [{ loader: 'happypack/loader?id=hp-scss' }]
            : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 2,
                      localIdentName: '[hash:base64:5]',
                      context: bundle.srcDir,
                      sourceMap: false,
                      modules: false,
                    },
                  },
                  { loader: 'postcss-loader' },
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
      ]),
    },
    plugins: removeNil([
      ...prefetchPlugins,
      new webpack.LoaderOptionsPlugin({
        minimize: !_DEV,
        debug: _DEV,
        context: CWD,
      }),

      new ProgressBarPlugin({
        format: `${chalk.cyan.bold('Boldr')} status [:bar] ${chalk.magenta(
          ':percent',
        )} (:elapsed seconds)`,
        clear: false,
        summary: true,
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(mode),
      }),
      new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(_DEV),
        __IS_SERVER__: JSON.stringify(false),
        __IS_CLIENT__: JSON.stringify(true),
        __CHUNK_MANIFEST__: JSON.stringify(
          path.join(bundle.assetsDir || '', 'chunk-manifest.json'),
        ),
        __ASSETS_MANIFEST__: JSON.stringify(
          path.join(bundle.assetsDir || '', 'assets-manifest.json'),
        ),
        'process.browser': JSON.stringify(true),
        'process.server': JSON.stringify(false),
      }),
      happyPackPlugin({
        name: 'hp-js',
        loaders: [
          {
            path: 'babel-loader',
            query: {
              babelrc: false,
              compact: true,
              sourceMaps: true,
              comments: false,
              cacheDirectory: _DEV,
              presets: [require.resolve('babel-preset-boldr/browser')],
              plugins: removeNil([
                ifDev(require.resolve('react-hot-loader/babel')),
                [
                  require.resolve('babel-plugin-styled-components'),
                  {
                    ssr: true,
                  },
                ],
                [
                  require.resolve('./util/loadableBabel.js'),
                  {
                    server: true,
                    webpack: true,
                  },
                ],
              ]),
            },
          },
        ],
      }),
      ifDev(() => new webpack.NamedModulesPlugin()),

      ifProd(() => new webpack.HashedModuleIdsPlugin()),
      ifProd(
        () =>
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
              // A module is extracted into the vendor chunk when...
              return (
                // If it's inside node_modules
                /node_modules/.test(module.context) &&
                // Do not externalize if the request is a CSS file
                !/\.(css|less|scss|sass|styl|stylus)$/.test(module.request)
              );
            },
          }),
      ),
      ifProd(
        () =>
          new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity,
          }),
      ),
      ifProd(
        () =>
          new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 4,
          }),
      ),
      ifProd(() => new BabiliPlugin({}, { comments: false })),
      ifProd(
        () =>
          new ExtractTextPlugin({
            filename: '[name]-[contenthash:8].css',
            allChunks: true,
            ignoreOrder: bundle.cssModules,
          }),
      ),

      ifProd(() => new webpack.optimize.AggressiveMergingPlugin()),
      // case sensitive paths
      ifDev(() => new CaseSensitivePathsPlugin()),
      ifDev(
        () =>
          new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            // show a warning when there is a circular dependency
            failOnError: false,
          }),
      ),
      ifDev(
        () =>
          new LoggerPlugin({
            verbose: bundle.verbose,
            target: 'web',
          }),
      ),
      new AssetsPlugin({
        filename: 'assets-manifest.json',
        path: bundle.assetsDir,
        prettyPrint: true,
      }),
      ifProd(
        () =>
          new StatsPlugin('stats.json', {
            chunkModules: true,
            exclude: [/node_modules[\\/]react/],
          }),
      ),
      ifProd(
        () =>
          new ChunkManifestPlugin({
            filename: 'chunk-manifest.json',
            manifestVariable: 'CHUNK_MANIFEST',
          }),
      ),
      // Errors during development will kill any of our NodeJS processes.
      // this prevents that from happening.
      ifDev(() => new webpack.NoEmitOnErrorsPlugin()),
      //  We need this plugin to enable hot module reloading
      ifDev(() => new webpack.HotModuleReplacementPlugin()),
      ifProd(
        () =>
          new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            logLevel: 'error',
          }),
      ),
    ]),
  };
  if (_DEV) {
    browserConfig.plugins.push(
      happyPackPlugin({
        name: 'hp-css',
        loaders: [
          { path: 'style-loader' },
          {
            path: 'css-loader',
            use: {
              autoprefixer: false,
              modules: bundle.cssModules,
              minimize: false,
              importLoaders: 1,
              context: bundle.srcDir,
              localIdentName: LOCAL_IDENT,
            },
          },
          {
            path: 'postcss-loader',
            use: {
              // https://webpack.js.org/guides/migrating/#complex-options
              ident: 'postcss',
              plugins: postCssConfig,
            },
          },
        ],
      }),
      happyPackPlugin({
        name: 'hp-scss',
        loaders: [
          { path: 'style-loader' },
          {
            path: 'css-loader',
            use: {
              importLoaders: 2,
              localIdentName: LOCAL_IDENT,
              sourceMap: false,
              modules: false,
              context: bundle.srcDir,
            },
          },
          { path: 'postcss-loader' },
          {
            path: 'fast-sass-loader',
          },
        ],
      }),
      new webpack.DllReferencePlugin({
        manifest: require(path.resolve(bundle.assetsDir, '__vendor_dlls__.json')),
      }),
    );
  }
  return browserConfig;
}
