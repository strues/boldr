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
import { removeNil, mergeDeep, ifElse } from 'boldr-utils';
import config from '../../config';
import { styles, emitErrors, uglify, aggressiveMerge, commonsChunk, happyPackPlugin } from './plugins';
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

  const isOptimize = optimize;
  const isDev = !optimize;
  const isClient = target === 'client';
  const isServer = target === 'server';
  const isNode = !isClient;

  const ifDev = ifElse(isDev);
  const ifOptimize = ifElse(isOptimize);
  const ifNode = ifElse(isNode);
  const ifClient = ifElse(isClient);
  const ifDevClient = ifElse(isDev && isClient);
  const ifOptimizeClient = ifElse(isOptimize && isClient);

  console.log(
    chalk.white.bgBlue(
      `==> Creating ${isOptimize
        ? 'an optimized'
        : 'a development'} bundle configuration for the "${target}"`,
    ),
  );

  const bundleConfig = isServer || isClient
    ? config(['bundles', target])
    : config(['additionalNodeBundles', target]);

  if (!bundleConfig) {
    throw new Error('No bundle configuration exists for target:', target);
  }

  let webpackConfig = {
    target: isClient ? 'web' : 'node',

    entry: {
      index: removeNil([
        ifDevClient('react-hot-loader/patch'),
        ifDevClient(
          () => `webpack-hot-middleware/client?reload=true&path=http://${config('host')}:${config('hmrPort')}/__webpack_hmr`, // eslint-disable-line
        ), // eslint-disable-line
        ifClient('regenerator-runtime/runtime'),
        path.resolve(ROOT_DIR, bundleConfig.entryFile),
      ]),
    },
    output: {
      path: path.resolve(ROOT_DIR, bundleConfig.outputPath),
      filename: ifOptimizeClient('[name]-[chunkhash].js', '[name].js'),
      chunkFilename: '[name]-[chunkhash].js',
      libraryTarget: ifNode('commonjs2', 'var'),
      publicPath: ifDev(
        `http://${config('host')}:${config('hmrPort')}${config('bundles.client.webPath')}`,
        bundleConfig.webPath,
      ),
    },
    resolve: {
      mainFields: ifNode(
        ['module', 'jsnext:main', 'main'],
        ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      ),
    },
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
        whitelist: removeNil(['source-map-support/register']).concat(
          config('extWhitelist') || [],
        ),
      })),
    ]),

    devtool: ifElse(
      isNode || isDev || config('incSourceMaps'),
    )('source-map', 'hidden-source-map'),

    performance: ifOptimizeClient({ hints: 'warning' }, false),

    plugins: removeNil([
      ifNode(() => new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      })),

      ifClient(() => new WebpackMd5Hash()),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.BUILD_FLAG_IS_CLIENT': JSON.stringify(isClient),
        'process.env.BUILD_FLAG_IS_SERVER': JSON.stringify(isServer),
        'process.env.BUILD_FLAG_IS_NODE': JSON.stringify(isNode),
        'process.env.BUILD_FLAG_IS_DEV': JSON.stringify(isDev),
        __DEV__: JSON.stringify(isDev),
        __SERVER__: JSON.stringify(isServer),
      }),

      ifClient(() => new AssetsPlugin({
        filename: config('bundleAssetsFileName'),
        path: path.resolve(ROOT_DIR, bundleConfig.outputPath),
      })),
      ifDev(emitErrors),
      ifDevClient(() => new webpack.HotModuleReplacementPlugin()),
      ifOptimizeClient(() => new webpack.LoaderOptionsPlugin({
        minimize: true,
      })),
      ifOptimizeClient(commonsChunk),
      ifOptimizeClient(aggressiveMerge),
      ifDev(() => new NamedModulesPlugin()),
      ifOptimizeClient(
        ifElse(config('optimizeProdBuild'))(
          uglify,
        ),
      ),
      ifOptimizeClient(
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
                  ifClient(['latest', { es2015: { modules: false } }]),
                  ifNode(['env', { targets: { node: true }, modules: false }]),
                ].filter(x => x != null),
                plugins: [
                  ifDevClient('react-hot-loader/babel'),
                  'transform-decorators-legacy',
                  ['transform-class-properties', { spec: true }],
                  ['transform-object-rest-spread', { useBuiltIns: true }],
                  ifClient(['transform-react-jsx', { useBuiltIns: true }]),
                  ifClient('dynamic-import-webpack'),
                  'transform-flow-strip-types',
                  'transform-es2015-arrow-functions',
                  ['transform-runtime', {
                    helpers: false,
                    polyfill: false,
                    regenerator: true,
                  }],
                  ['transform-regenerator', { async: false }],
                  ifDev('transform-react-jsx-self'),
                  ifDev('transform-react-jsx-source'),
                  ifNode('dynamic-import-node'),
                  ifOptimize('transform-react-inline-elements'),
                  ifOptimize('transform-react-constant-elements'),
                ].filter(x => x != null),
              },
              buildOptions,
            ),
          },
        ],
      }),
      ifDevClient(() => happyPackPlugin(styles)),
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
            ifOptimizeClient(path.resolve(ROOT_DIR, 'src/html')),
          ]),
        },
        ifElse(isClient || isServer)(
          mergeDeep(
            { test: /(\.scss|\.css)$/ },
            ifDevClient({
              loaders: ['happypack/loader?id=hp-scss'],
            }),
            ifOptimizeClient(() => ({
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap&importLoaders=2!postcss-loader!sass-loader?outputStyle=expanded&sourceMap&sourceMapContents', // eslint-disable-line
              }),
            })),
            ifNode({
              loaders: ['css-loader/locals', 'postcss-loader', 'sass-loader'],
            }),
          ),
        ),

        ifElse(isClient || isServer)(() => ({
          test: new RegExp(
            `\\.(${config('bundleAssetTypes').join('|')})$`,
            'i',
          ),
          loader: 'file-loader',
          query: {
            publicPath: (
              isDev
                ? `http://${config('host')}:${config('hmrPort')}${config('bundles.client.webPath')}`
                : config('bundles.client.webPath')
            ),
            emitFile: isClient,
          },
        })),
      ]),
    },
  };
  if (isOptimize && isClient) {
    webpackConfig = withServiceWorker(webpackConfig, bundleConfig);
  }
  // Apply the configuration middleware.
  return config('plugins.webpackConfig')(webpackConfig, buildOptions);
}
