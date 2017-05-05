/* eslint-disable eqeqeq */
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import appRootDir from 'app-root-dir';
import BabiliPlugin from 'babili-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';
import { removeNil, mergeDeep, ifElse, logger } from 'boldr-utils';
import config from '../../config';
import { happyPackPlugin } from '../utils';
import withServiceWorker from './withServiceWorker';

const ROOT_DIR = appRootDir.get();

const prefetches = [];

const prefetchPlugins = prefetches.map(
  specifier => new webpack.PrefetchPlugin(specifier),
);
/**
 * @param  {Object} buildOptions - The build options.
 * @param  {target} buildOptions.target - The bundle target
 *  (e.g 'clinet' || 'server').
 * @param  {target} buildOptions.optimize - Build an optimised
 * version of the bundle?
 *
 * @return {Object} The webpack configuration.
 */
export default function webpackConfigFactory(buildOptions) {
  const { target, optimize = false } = buildOptions;

  const isProd = optimize;
  const isDev = !isProd;
  const isClient = target === 'client';
  const isServer = target === 'server';
  const isNode = !isClient;

  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);
  const ifNode = ifElse(isNode);
  const ifClient = ifElse(isClient);
  const ifDevClient = ifElse(isDev && isClient);
  const ifProdClient = ifElse(isProd && isClient);

  logger.start(`Creating ${isProd ? 'an optimized' : 'a development'} bundle config for the "${target}"`); // eslint-disable-line

  const bundleConfig = isServer || isClient
    ? config(['bundles', target])
    : config(['additionalNodeBundles', target]);

  if (!bundleConfig) {
    logger.error(`No bundle configuration exists for target: ${target}`);
    throw new Error();
  }

  let webpackConfig = {
    target: isClient ? 'web' : 'node',

    entry: {
      index: removeNil([
        ifDevClient(
          () => `webpack-hot-middleware/client?reload=true&path=http://${config('host')}:${config('hmrPort')}/__webpack_hmr`,
        ), // eslint-disable-line
        path.resolve(ROOT_DIR, bundleConfig.entryFile),
      ]),
    },
    output: {
      path: path.resolve(ROOT_DIR, bundleConfig.outputPath),
      filename: ifProdClient('[name]-[chunkhash].js', '[name].js'),
      chunkFilename: '[name]-[chunkhash].js',
      libraryTarget: ifNode('commonjs2', 'var'),
      publicPath: ifDev(
        `http://${config('host')}:${config('hmrPort')}${config('bundles.client.webPath')}`,
        bundleConfig.webPath,
      ),
    },
    cache: true,
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss'],
      mainFields: ifNode(
        ['module', 'jsnext:main', 'main'],
        ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      ),
    },
    node: {
      __dirname: true,
      __filename: true,
      fs: 'empty',
      global: true,
      crypto: 'empty',
    },
    externals: removeNil([
      ifNode(() =>
        nodeExternals({
          whitelist: removeNil(['source-map-support/register']).concat(
            config('extWhitelist') || [],
          ), // eslint-disable-line
        }),
      ),
    ]),

    devtool: ifElse(isNode || isDev || config('incSourceMaps'))(
      'source-map',
      'hidden-source-map',
    ), // eslint-disable-line

    performance: ifProdClient({ hints: 'warning' }, false),
    plugins: removeNil([
      ...prefetchPlugins,
      ifNode(
        () =>
          new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
          }),
      ),

      ifClient(() => new WebpackMd5Hash()),
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProd ? 'production' : 'development',
        BUILD_FLAG_IS_CLIENT: isClient,
        BUILD_FLAG_IS_SERVER: isServer,
        BUILD_FLAG_IS_NODE: isNode,
        BUILD_FLAG_IS_DEV: isDev,
      }),
      new webpack.DefinePlugin({
        IS_DEV: JSON.stringify(isDev),
        __SERVER__: JSON.stringify(isServer),
        DEBUG: JSON.stringify(process.env.DEBUG),
        __USE_PROXY__: JSON.stringify(process.env.USE_PROXY),
      }),
      ifDev(() => new CircularDependencyPlugin()),
      ifDev(() => new CaseSensitivePathsPlugin()),
      ifClient(
        () =>
          new AssetsPlugin({
            filename: config('bundleAssetsFileName'),
            path: path.resolve(ROOT_DIR, bundleConfig.outputPath),
          }),
      ),
      ifDev(() => new webpack.NoEmitOnErrorsPlugin()),
      ifDevClient(() => new webpack.HotModuleReplacementPlugin()),
      ifProdClient(
        () =>
          new webpack.LoaderOptionsPlugin({
            minimize: true,
          }),
      ),
      happyPackPlugin({
        name: 'hp-js',
        loaders: [
          {
            path: 'babel-loader',
            query: {
              babelrc: false,
              compact: true,
              cacheDirectory: true,
              sourceMaps: false,
              comments: false,
              presets: [
                ifClient([
                  'env',
                  {
                    useBuiltIns: true,
                    debug: false,
                    modules: false,
                    targets: {
                      node: 'current',
                    },
                    exclude: [
                      'transform-async-to-generator',
                      'transform-regenerator',
                    ], // eslint-disable-line
                  },
                ]),
                ifNode([
                  'env',
                  {
                    useBuiltIns: true,
                    debug: false,
                    modules: false,
                    targets: {
                      node: 'current',
                    },
                    exclude: [
                      'transform-async-to-generator',
                      'transform-regenerator',
                    ], // eslint-disable-line
                  },
                ]),
                'stage-2',
                'react',
              ].filter(x => x != null),
              plugins: [
                'syntax-dynamic-import',
                'syntax-flow',
                'syntax-trailing-function-commas',
                'transform-decorators-legacy',
                'fast-async',
                ifClient([
                  'react-loadable/babel',
                  {
                    server: true,
                    webpack: true,
                  },
                ]),
                ifNode('dynamic-import-node'),
                ifClient('dynamic-import-webpack'),
                ifClient(['transform-react-jsx', { useBuiltIns: true }]),
                ifProd('transform-flow-strip-types'),
                ifDev('transform-react-jsx-self'),
                ifDev('transform-react-jsx-source'),
              ].filter(x => x != null),
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
          },
        ],
      }),
       ifProdClient(
        () =>
          new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 6,
          }),
      ),
      ifProdClient(() => new webpack.optimize.AggressiveMergingPlugin()),
      ifDevClient(() => new NamedModulesPlugin()),
      ifProdClient(() => new webpack.HashedModuleIdsPlugin()),
      ifProdClient(
        () =>
          new BabiliPlugin(),
      ),
      ifProdClient(
        () =>
          new ExtractTextPlugin({
            filename: '[name]-[chunkhash].css',
            allChunks: true,
          }),
      ),
    ]),
    module: {
      rules: removeNil([
        {
          test: /\.jsx?$/,
          use: ['cache-loader', 'happypack/loader?id=hp-js'],
          exclude: [
            /node_modules/,
            path.resolve(ROOT_DIR, './.happypack'),
            path.resolve(ROOT_DIR, './boldrCMS'),
            path.resolve(ROOT_DIR, './internal'),
            path.resolve(ROOT_DIR, './.cache-loader'),
          ],
          include: removeNil([
            ...bundleConfig.srcPaths.map(srcPath =>
              path.resolve(ROOT_DIR, srcPath),
            ),
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
                use: 'css-loader?sourceMap&importLoaders=2!postcss-loader!sass-loader', // eslint-disable-line
              }),
            })),
            ifNode({
              loaders: ['css-loader/locals', 'postcss-loader', 'sass-loader'], // eslint-disable-line
            }),
          ),
        ),
        {
          test: /\.svg(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]', // eslint-disable-line
        },
        {
          test: /\.(eot|woff|woff2|ttf|otf|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf|html)$/, // eslint-disable-line
          loader: 'file-loader',
          options: {
            name: ifProdClient('file-[hash:base62:8].[ext]', '[name].[ext]'),
            emitFile: isClient,
          },
        },
      ]),
    },
  };
  if (isProd && isClient) {
    webpackConfig = withServiceWorker(webpackConfig, bundleConfig);
  }
  // Apply the configuration middleware.
  return config('plugins.webpackConfig')(webpackConfig, buildOptions);
}
