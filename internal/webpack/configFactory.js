/* eslint-disable eqeqeq */
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import { sync as globSync } from 'glob';
import AssetsPlugin from 'assets-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import appRootDir from 'app-root-dir';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';

import { happyPackPlugin } from '../utils';

import { removeNil, mergeDeep, ifElse } from '../../shared/core/utils';
import config from '../../config';
import withServiceWorker from './withServiceWorker';

const ROOT_DIR = appRootDir.get();

/**
 * @param  {Object} buildOptions - The build options.
 * @param  {target} buildOptions.target - The bundle target (e.g 'clinet' || 'server').
 * @param  {target} buildOptions.optimize - Build an optimised version of the bundle?
 *
 * @return {Object} The webpack configuration.
 */
export default function webpackConfigFactory(buildOptions) {
  const { target, optimize = false } = buildOptions;

  const NODE_ENV = process.env.NODE_ENV || 'development';

  const isProd = optimize;
  const isDev = !optimize;
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
      `==> Creating ${isProd ? 'an optimized' : 'a development'} bundle configuration for the "${target}"`,
    ),
  );

  const bundleConfig = isServer || isClient
    ? // This is either our "server" or "client" bundle.
      config(['bundles', target])
    : // Otherwise it must be an additional node bundle.
      config(['additionalNodeBundles', target]);

  if (!bundleConfig) {
    throw new Error('No bundle configuration exists for target:', target);
  }

  let webpackConfig = {
    target: isClient ? 'web' : 'node',

    entry: {
      index: removeNil([
        ifDevClient('react-hot-loader/patch'),
        ifDevClient(
          () => `webpack-hot-middleware/client?reload=true&path=http://${config('host')}:${config('clientDevServerPort')}/__webpack_hmr`, // eslint-disable-line
        ), // eslint-disable-line
        ifClient('regenerator-runtime/runtime'),
        path.resolve(ROOT_DIR, bundleConfig.srcEntryFile),
      ]),
    },
    output: {
      path: path.resolve(ROOT_DIR, bundleConfig.outputPath),
      filename: ifProdClient('[name]-[chunkhash].js', '[name].js'),
      chunkFilename: '[name]-[chunkhash].js',
      libraryTarget: ifNode('commonjs2', 'var'),
      publicPath: ifDev(
        `http://${config('host')}:${config('clientDevServerPort')}${config('bundles.client.webPath')}`,
        bundleConfig.webPath,
      ),
    },
    resolve: {
      mainFields: ifNode(
        ['module', 'jsnext:main', 'main'],
        ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      ),
      extensions: config('bundleSrcTypes').map(ext => `.${ext}`),
      alias: mergeDeep(
        ifProd({
          react$: path.resolve(
            ROOT_DIR, './node_modules/react/dist/react.min.js',
          ),
          'react-dom$': path.resolve(
            ROOT_DIR, './node_modules/react-dom/dist/react-dom.min.js',
          ),
          'react-dom/server$': path.resolve(
            ROOT_DIR, './node_modules/react-dom/dist/react-dom-server.min.js',
          ),
        }),
      ),
    },
    // node global polyfills
    node: {
      __dirname: true,
      __filename: true,
      global: true,
      crypto: true,
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
    },

    externals: removeNil([
      ifNode(() => nodeExternals({
        whitelist: removeNil(['source-map-support/register',
          ifProd('react'),
          ifProd('react-dom'),
          ifProd('react-dom/server'),
        ]).concat(
          config('nodeExternalsFileTypeWhitelist') || [],
        ),
      })),
    ]),

    devtool: ifElse(
      isNode || isDev || config('incSourceMaps'),
    )('source-map', 'hidden-source-map'),

    performance: ifProdClient({ hints: 'warning' }, false),

    plugins: removeNil([
      ifNode(() => new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      })),

      ifClient(() => new WebpackMd5Hash()),
      new webpack.DefinePlugin({
        // Is this the "client" bundle?
        'process.env.BUILD_FLAG_IS_CLIENT': JSON.stringify(isClient),
       // Is this the "server" bundle?
        'process.env.BUILD_FLAG_IS_SERVER': JSON.stringify(isServer),
       // Is this a node bundle?
        'process.env.BUILD_FLAG_IS_NODE': JSON.stringify(isNode),
       // Is this a development build?
        'process.env.BUILD_FLAG_IS_DEV': JSON.stringify(isDev),
        __SERVER__: JSON.stringify(isServer),
      }),

      ifClient(() => new AssetsPlugin({
        filename: config('bundleAssetsFileName'),
        path: path.resolve(ROOT_DIR, bundleConfig.outputPath),
      })),

      ifDev(() => new webpack.NoEmitOnErrorsPlugin()),

      ifDevClient(() => new webpack.HotModuleReplacementPlugin()),

      ifProdClient(() => new webpack.LoaderOptionsPlugin({
        minimize: true,
      })),

      ifDev(() => new NamedModulesPlugin()),
      ifProdClient(
        ifElse(config('optimizeProductionBuilds'))(
          () => new webpack.optimize.UglifyJsPlugin({
            sourceMap: config('incSourceMaps'),
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
            query: config('plugins.babelConfig')(
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
            use: {
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
            use: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      })),
    ]),
    module: {
      rules: removeNil([
        {
          test: /\.jsx?$/,
          loader: 'happypack/loader?id=hp-js',
          exclude: [
            path.resolve(ROOT_DIR, 'node_modules'),
            path.resolve(ROOT_DIR, '.happypack'),
            path.resolve(ROOT_DIR, 'boldrCMS'),
          ],
          include: removeNil([
            ...bundleConfig.srcPaths.map(srcPath => path.resolve(ROOT_DIR, srcPath)),
            ifProdClient(path.resolve(ROOT_DIR, 'src/html')),
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
                fallback: 'style-loader',
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
            `\\.(${config('bundleAssetTypes').join('|')})$`,
            'i',
          ),
          loader: 'file-loader',
          query: {
            publicPath: (
              isDev
                ? `http://${config('host')}:${config('clientDevServerPort')}${config('bundles.client.webPath')}`
                : config('bundles.client.webPath')
            ),
            emitFile: isClient,
          },
        })),
      ]),
    },
  };
  if (isProd && isClient) {
    webpackConfig = withServiceWorker(webpackConfig, bundleConfig);
  }
  // Apply the configuration middleware.
  return config('plugins.webpackConfig')(webpackConfig, buildOptions);
}
