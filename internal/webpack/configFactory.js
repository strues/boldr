/* eslint-disable eqeqeq */
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import { sync as globSync } from 'glob';
import AssetsPlugin from 'assets-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import appRootDir from 'app-root-dir';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';

import { happyPackPlugin } from '../utils';

import { removeNil, mergeDeep, ifElse } from '../../shared/core/utils';
import getConfig from '../../config/get';
import ClientConfigScript from '../../config/ClientConfigScript';

export default function webpackConfigFactory(buildOptions) {
  const { target } = buildOptions;

  const NODE_ENV = process.env.NODE_ENV || 'development';

  const isDev = NODE_ENV === 'development';
  const isProd = !isDev;
  const isClient = target === 'client';
  const isServer = target === 'server';
  const isNode = !isClient;

  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);
  const ifNode = ifElse(isNode);
  const ifClient = ifElse(isClient);
  const ifDevClient = ifElse(isDev && isClient);
  const ifProdClient = ifElse(isProd && isClient);

  console.log(
    chalk.white.bgBlue(
      `==> Creating "${target}" webpack config in "${isDev
        ? 'development'
        : 'production'}" mode`,
    ),
  );

  const bundleConfig = isServer || isClient
    ? // This is either our "server" or "client" bundle.
      getConfig(['bundles', target])
    : // Otherwise it must be an additional node bundle.
      getConfig(['additionalNodeBundles', target]);

  if (!bundleConfig) {
    throw new Error('No bundle configuration exists for target:', target);
  }

  const webpackConfig = {
    target: isClient ? 'web' : 'node',
    node: {
      __dirname: true,
      __filename: true,
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
    },
    externals: removeNil([
      ifNode(() => nodeExternals({
        whitelist: ['source-map-support/register'].concat(
          getConfig('nodeExternalsFileTypeWhitelist') || [],
        ),
      })),
    ]),
    devtool: ifElse(
      isNode || isDev || getConfig('includeSourceMapsForProductionBuilds'),
    )('source-map', 'hidden-source-map'),
    performance: ifProdClient({ hints: 'warning' }, false),
    entry: {
      index: removeNil([
        ifDevClient('react-hot-loader/patch'),
        ifDevClient(
          () =>
            `webpack-hot-middleware/client?reload=true&path=http://${getConfig(
              'host',
            )}:${getConfig('clientDevServerPort')}/__webpack_hmr`,
        ), // eslint-disable-line
        ifClient('regenerator-runtime/runtime'),
        path.resolve(appRootDir.get(), bundleConfig.srcEntryFile),
      ]),
    },
    output: mergeDeep(
      {
        path: path.resolve(appRootDir.get(), bundleConfig.outputPath),
        filename: ifProdClient('[name]-[chunkhash].js', '[name].js'),
        chunkFilename: '[name]-[chunkhash].js',
        libraryTarget: ifNode('commonjs2', 'var'),
      },
      ifElse(isServer || isClient)(() => ({
        publicPath: ifDev(
          `http://${getConfig('host')}:${getConfig(
            'clientDevServerPort',
          )}${getConfig('bundles.client.webPath')}`,
          bundleConfig.webPath,
        ),
      })),
    ),
    resolve: {
      mainFields: ifNode(
        ['module', 'jsnext:main', 'main'],
        ['web', 'browser', 'style', 'module', 'jsnext:main', 'main']
      ),
      extensions: getConfig('bundleSrcTypes').map(ext => `.${ext}`),
    },
    plugins: removeNil([
      ifNode(
        () => new webpack.BannerPlugin({
          banner: 'require("source-map-support").install();',
          raw: true,
          entryOnly: false,
        }),
      ),
      ifClient(() => new WebpackMd5Hash()),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isDev ? 'development' : 'production',
        ),
        // Is this the "client" bundle?
        'process.env.IS_CLIENT': JSON.stringify(isClient),
        // Is this the "server" bundle?
        'process.env.IS_SERVER': JSON.stringify(isServer),
        // Is this a node bundle?
        'process.env.IS_NODE': JSON.stringify(isNode),
        __SERVER__: JSON.stringify(isServer),
      }),
      ifClient(
        () => new AssetsPlugin({
          filename: getConfig('bundleAssetsFileName'),
          path: path.resolve(appRootDir.get(), bundleConfig.outputPath),
        }),
      ),
      ifDev(() => new webpack.NoEmitOnErrorsPlugin()),
      ifDevClient(() => new webpack.HotModuleReplacementPlugin()),
      ifProdClient(
        () => new webpack.LoaderOptionsPlugin({
          minimize: getConfig('optimizeProductionBuilds'),
        }),
      ),
      ifDev(() => new NamedModulesPlugin()),
      ifProdClient(
        ifElse(getConfig('optimizeProductionBuilds'))(
          () => new webpack.optimize.UglifyJsPlugin({
            sourceMap: getConfig('includeSourceMapsForProductionBuilds'),
            compress: {
              screw_ie8: true,
              warnings: false,
            },
            mangle: {
              screw_ie8: true,
            },
            output: {
              comments: false,
              screw_ie8: true,
            },
          }),
        ),
      ),
      ifProdClient(
        () => new ExtractTextPlugin({
          filename: '[name]-[chunkhash].css',
          allChunks: true,
        }),
      ),
      happyPackPlugin({
        name: 'hp-js',
        loaders: [
          {
            path: 'babel-loader',
            query: getConfig('plugins.babelConfig')(
              {
                babelrc: false,
                compact: true,
                cacheDirectory: true,
                sourceMaps: true,
                comments: false,
                presets: [
                  'react',
                  'stage-2',
                  ifClient(['latest', { es2015: { modules: false } }]),
                  ifNode(['env', { targets: { node: true }, modules: false }]),
                ].filter(x => x != null),
                plugins: [
                  ifDevClient('react-hot-loader/babel'),
                  'transform-decorators-legacy',
                  ['transform-class-properties', { spec: true }],
                  ['transform-object-rest-spread', { useBuiltIns: true }],
                  ifClient(['transform-react-jsx', { useBuiltIns: true }]),
                  'transform-flow-strip-types',
                  'transform-es2015-arrow-functions',
                  [
                    'transform-runtime',
                    {
                      helpers: false,
                      polyfill: false,
                      regenerator: true,
                    },
                  ],
                  [
                    'transform-regenerator',
                    {
                      async: false,
                    },
                  ],
                  ifDev('transform-react-jsx-self'),
                  ifDev('transform-react-jsx-source'),
                  ifNode('dynamic-import-node'),
                  ifProd('transform-react-inline-elements'),
                  ifProd('transform-react-constant-elements'),
                ].filter(x => x != null),
              },
              buildOptions,
            ),
          },
        ],
      }),
      ifDevClient(() => happyPackPlugin({
        name: 'hp-scss',
        loaders: [
          { path: 'style-loader' },
          {
            path: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
              modules: true,
            },
          },
          {
            path: 'postcss-loader',
          },
          {
            path: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      })),
      // Service Worker - Offline Page generation.
      ifElse(isProd && isClient && getConfig('serviceWorker.enabled'))(
        () => new HtmlWebpackPlugin({
          filename: getConfig('serviceWorker.offlinePageFileName'),
          template: (
            `babel-loader!${getConfig('serviceWorker.offlinePageTemplate')}`
          ),
          production: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeNilAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
          inject: true,
          // We pass our getConfig and client config script compoent as it will
          // be needed by the offline template.
          custom: {
            getConfig,
            ClientConfigScript,
          },
        }),
      ),
      ifElse(isProd && isClient && getConfig('serviceWorker.enabled'))(
        () => new OfflinePlugin({
          // Setting this value lets the plugin know where our generated client
          // assets will be served from.
          // e.g. /client/
          publicPath: bundleConfig.webPath,
          relativePaths: false,
          ServiceWorker: {
            // The name of the service worker script that will get generated.
            output: getConfig('serviceWorker.fileName'),
            // Enable events so that we can register updates.
            events: true,
            publicPath: `/${getConfig('serviceWorker.fileName')}`,
            navigateFallbackURL: (
              `${bundleConfig.webPath}${getConfig(
                'serviceWorker.offlinePageFileName',
              )}`
            ),
          },
          AppCache: false,
          // Which external files should be included with the service worker?
          externals: // Add the polyfill io script as an external if it is enabled.
          (getConfig('polyfillIO.enabled')
            ? [getConfig('polyfillIO.url')]
            : [])// Add any included public folder assets.
          .concat(
            getConfig('serviceWorker.includePublicAssets').reduce(
              (acc, cur) => {
                const publicAssetPathGlob = path.resolve(
                  appRootDir.get(),
                  getConfig('publicAssetsPath'),
                  cur,
                );
                const publicFileWebPaths = acc.concat(
                  // First get all the matching public folder files.
                  globSync(publicAssetPathGlob, { nodir: true })
                    // Then map them to relative paths against the public folder.
                    // We need to do this as we need the "web" paths for each one.
                    .map(publicFile =>
                      path.relative(
                        path.resolve(
                          appRootDir.get(),
                          getConfig('publicAssetsPath'),
                        ),
                        publicFile,
                      ))
                    // Add the leading "/" indicating the file is being hosted
                    // off the root of the application.
                    .map(relativePath => `/${relativePath}`),
                );
                return publicFileWebPaths;
              },
              [],
            ),
          ),
        }),
      ),
    ]),
    module: {
      rules: removeNil([
        {
          test: /\.jsx?$/,
          loader: 'happypack/loader?id=hp-js',
          exclude: [
            path.resolve(appRootDir.get(), 'node_modules'),
            path.resolve(appRootDir.get(), '.happypack'),
            path.resolve(appRootDir.get(), 'boldrCMS'),
          ],
          include: removeNil([
            ...bundleConfig.srcPaths.map(srcPath =>
              path.resolve(appRootDir.get(), srcPath)),
            ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
          ]),
        },
        ifElse(isClient || isServer)(
          mergeDeep(
            { test: /(\.scss|\.css)$/ },
            ifDevClient({
              loaders: ['happypack/loader?id=hp-scss'],
            }),
            ifProdClient(() => ({
              loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader?sourceMap&importLoaders=2!postcss-loader!sass-loader?outputStyle=expanded&sourceMap&sourceMapContents', // eslint-disable-line
              }),
            })),
            ifNode({
              loaders: ['css-loader/locals', 'postcss-loader', 'sass-loader'],
            }),
          ),
        ),
        // ASSETS (Images/Fonts/etc)
        // This is bound to our server/client bundles as we only expect to be
        // serving the client bundle as a Single Page Application through the
        // server.
        ifElse(isClient || isServer)(() => ({
          test: new RegExp(
            `\\.(${getConfig('bundleAssetTypes').join('|')})$`,
            'i',
          ),
          loader: 'file-loader',
          query: {
            publicPath: (
              isDev
                ? `http://${getConfig('host')}:${getConfig(
                    'clientDevServerPort',
                  )}${getConfig('bundles.client.webPath')}`
                :
                  getConfig('bundles.client.webPath')
            ),
            emitFile: isClient,
          },
        })),
      ]),
    },
  };
  // Apply the configuration middleware.
  return getConfig('plugins.webpackConfig')(webpackConfig, buildOptions);
}
