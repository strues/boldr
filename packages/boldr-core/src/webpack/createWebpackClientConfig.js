import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import _debug from 'debug';
import chalk from 'chalk';
import AssetsPlugin from 'assets-webpack-plugin';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import cssnano from 'cssnano';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import removeNil from 'boldr-tools/es/arrays/removeNil';
import ifElse from 'boldr-tools/es/logic/ifElse';
import filterEmpty from 'boldr-tools/es/objects/filterEmpty';
import appRoot from 'boldr-tools/es/node/appRoot';

import PATHS from '../internal/paths';
import { cssLoaderConfig, postCssLoaderConfig, sassLoaderConfig } from './util/styleLoaders';
import happyPackPlugin from './plugins/happyPackPlugin';

dotenv.load();

export default config => {
  const debug = _debug('boldr:core:webpack:clientConfig');
  const paths = config.boundPath;
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = process.env.NODE_ENV === 'production';
  const __DEV__ = isDev;
  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);
  const PREFETCHES = [
    path.join(paths.boldr(), 'core/AppContainer.js'),
    path.join(paths.boldr(), 'core/htmlAttributes.js'),
    path.join(paths.src(), 'state/reducers.js'),
  ];

  const prefetchPlugins = PREFETCHES.map(specifier => new webpack.PrefetchPlugin(specifier));

  const webpackConfigClient = {
    name: 'client',
    target: 'web',
    devtool: config.compilerDevtool,
    entry: filterEmpty({
      app: __DEV__
        ? [
            require.resolve('react-hot-loader/patch'),
            `${require.resolve(
              'webpack-hot-middleware/client',
            )}?path=${config.compilerPublicPath}__webpack_hmr`,
            path.resolve(appRoot.get(), '.boldr/entry/client.js'),
          ]
        : path.resolve(appRoot.get(), '.boldr/entry/client.js'),
      vendor: ifProd(config.compilerVendor),
    }),
    output: {
      filename: __DEV__ ? '[name].js?[hash:4]' : '[chunkhash:32].js',
      path: paths.static(),
      pathinfo: isDev,
      publicPath: `${config.compilerPublicPath}static/`,
    },
    cache: isDev,
    resolve: {
      modules: ['node_modules', paths.src()].concat(PATHS.nodePaths),
      mainFields: ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      descriptionFiles: ['package.json'],
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '~': paths.src(),
        static: path.join(paths.src(), 'static'),
        '~static': path.join(paths.src(), 'static'),
        '~components': path.join(paths.src(), 'components'),
        '@@AppContainer': path.join(paths.boldr(), 'core/AppContainer.js'),
        '@@HtmlAttributes': path.join(paths.boldr(), 'core/htmlAttributes.js'),
        '@@AppReducers': path.join(paths.src(), 'state/reducers.js'),
      },
    },
    resolveLoader: {
      modules: [PATHS.boldrNodeModules, PATHS.projectNodeModules],
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      console: true,
      __filename: true,
      __dirname: true,
    },
    performance: false,

    module: {
      noParse: [/\.min\.js/],
      rules: [
        {
          test: /\.(js|jsx)$/,
          // include: paths.src(),
          exclude: /node_modules/,
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
        {
          test: /\.scss$/,
          use: __DEV__
            ? [
                {
                  loader: 'style-loader',
                },
                cssLoaderConfig,
                postCssLoaderConfig,
                sassLoaderConfig,
              ]
            : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [cssLoaderConfig, postCssLoaderConfig, sassLoaderConfig],
              }),
        },
        {
          test: /\.css$/,
          use: __DEV__
            ? [
                {
                  loader: 'style-loader',
                },
                cssLoaderConfig,
                postCssLoaderConfig,
              ]
            : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [cssLoaderConfig, postCssLoaderConfig],
              }),
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          exclude: /node_modules/,
          options: { limit: 10000, emitFile: true },
        },
        {
          test: /\.svg(\?v=\d+.\d+.\d+)?$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]', // eslint-disable-line
        },
        // file
        {
          test: /\.(ico|eot|ttf|otf|mp4|mp3|ogg|pdf|html)$/, // eslint-disable-line
          loader: 'file-loader',
          exclude: /node_modules/,
          options: {
            emitFile: true,
          },
        },
      ],
    },

    plugins: [
      ...prefetchPlugins,
      new webpack.LoaderOptionsPlugin({
        minimize: !isDev,
        debug: isDev,
        options: {
          context: __dirname,
        },
      }),
      new ProgressBarPlugin({
        format: `${chalk.cyan.bold('Boldr')} status [:bar] ${chalk.magenta(
          ':percent',
        )} (:elapsed seconds)`,
        clear: false,
        summary: true,
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(isDev),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.SERVER_PORT': process.env.SERVER_PORT,
        __DEBUG__: JSON.stringify(isDev),
        __CLIENT__: true,
        __SERVER__: false,
        GRAPHQL_URL: JSON.stringify(process.env.GRAPHQL_URL),
        __WEBPACK_MANIFEST__: JSON.stringify(
          path.join(paths.static() || '', 'webpack-manifest.json'),
        ),
        __CHUNK_MANIFEST__: JSON.stringify(path.join(paths.static() || '', 'chunk-manifest.json')),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'],
        filename: '[name].js',
        minChunks: Infinity,
      }),
      new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /en/),
      new AssetsPlugin({
        filename: 'webpack-manifest.json',
        path: paths.static(),
        prettyPrint: true,
      }),
      happyPackPlugin({
        name: 'hp-js',
        loaders: [
          {
            path: 'babel-loader',
            query: {
              babelrc: false,
              comments: false,
              compact: true,
              cacheDirectory: isDev,
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
    ],
  };

  if (isDev) {
    debug('Enable "development" webpack plugins...');

    webpackConfigClient.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new CaseSensitivePathsPlugin(),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        // show a warning when there is a circular dependency
        failOnError: false,
      }),
      new webpack.DllReferencePlugin({
        manifest: require(path.join(paths.static(), 'boldrDLLs.json')),
      }),
    );
  }
  if (isProd) {
    webpackConfigClient.plugins.push(
      new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        allChunks: true,
        disable: isDev,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
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
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: Infinity,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        minChunks: 4,
      }),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'CHUNK_MANIFEST',
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      /* eslint-disable */
      new UglifyJSPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    );
  }
  return webpackConfigClient;
};
