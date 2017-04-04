/* eslint-disable eqeqeq */
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import { sync as globSync } from 'glob';
import AssetsPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';
import BabiliWebpackPlugin from 'babili-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import appRootDir from 'app-root-dir';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';
import { removeNil, mergeDeep, ifElse } from 'boldr-utils';
import config from '../../config';
import { happyPackPlugin } from '../utils';
import withServiceWorker from './withServiceWorker';

const ROOT_DIR = appRootDir.get();

const prefetches = [];

const prefetchPlugins = prefetches.map((specifier) => new webpack.PrefetchPlugin(specifier));
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
  const mode = NODE_ENV;
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

  console.log(
    chalk.white.bgBlue(
      `==> Creating ${isProd ? 'an optimized' : 'a development'} bundle configuration for the "${target}"`,
    ),
  );

  const bundleConfig = isServer || isClient ? config(['bundles', target]) : config(['additionalNodeBundles', target]);

  if (!bundleConfig) {
    throw new Error('No bundle configuration exists for target:', target);
  }

  let webpackConfig = {
    target: isClient ? 'web' : 'node',

    entry: {
      index: removeNil([
        ifDevClient(() => 'webpack-hot-middleware/client?reload=true&path=http://localhost:3001/__webpack_hmr'), // eslint-disable-line
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
      alias: {
      // necessary when using symlinks that require these guys
        react: path.join(ROOT_DIR, 'node_modules', 'react'),
        'react-dom': path.join(ROOT_DIR, 'node_modules', 'react-dom'),
      },
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
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
    },
    externals: removeNil([
      ifNode(() =>
        nodeExternals({
          whitelist: removeNil(['source-map-support/register']).concat(config('extWhitelist') || []),
        })),
    ]),

    devtool: ifElse(isNode || isDev || config('incSourceMaps'))('source-map', 'hidden-source-map'),

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
        __DEV__: JSON.stringify(isDev),
        __SERVER__: JSON.stringify(isServer),
      }),

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
                'react',
                ifClient([
                  'env',
                  {
                    useBuiltIns: false,
                    debug: false,
                    modules: false,
                    targets: {
                      node: 'current',
                    },
                    exclude: ['transform-async-to-generator', 'transform-regenerator'],
                  },
                ]),
                ifNode([
                  'env',
                  {
                    useBuiltIns: false,
                    debug: false,
                    modules: false,
                    targets: {
                      node: 'current',
                    },
                    exclude: ['transform-async-to-generator', 'transform-regenerator'],
                  },
                ]),
                'stage-2',
              ].filter(x => x != null),
              plugins: [
                'transform-decorators-legacy',
                'fast-async',
                ifNode('dynamic-import-node'),
                ifClient('dynamic-import-webpack'),
                ifClient(['transform-react-jsx', { useBuiltIns: true }]),
                'transform-flow-strip-types',
                ifDev('transform-react-jsx-self'),
                ifDev('transform-react-jsx-source'),
                ifProd('transform-react-inline-elements'),
                ifProd('transform-react-constant-elements'),
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
            path: 'fast-sass-loader',
          },
        ],
      }),

      ifProdClient(
        () =>
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
          }),
      ),
      ifProdClient(() => new webpack.optimize.AggressiveMergingPlugin()),
      ifDevClient(() => new NamedModulesPlugin()),
      ifProdClient(() => new BabiliWebpackPlugin()),
      ifProdClient(
        () =>
          new ExtractTextPlugin({
            filename: '[name]-[chunkhash].css',
            allChunks: true,
          }),
      ),
      ifProdClient(
        () =>
          new PurifyCSSPlugin({
            paths: [...globSync(`${ROOT_DIR}/src/shared/**/*.js`),
              ...globSync(`${ROOT_DIR}/src/shared/**/*.(scss|css)`)],
            styleExtensions: ['.css', '.scss'],
            moduleExtensions: [],
            purifyOptions: {
              minify: true,
              info: true,
              rejected: true,
            },
          }),
      ),
    ]),
    module: {
      rules: removeNil([
        {
          test: /\.jsx?$/,
          loader: 'happypack/loader?id=hp-js',
          exclude: [
            /node_modules/,
            path.resolve(ROOT_DIR, './.happypack'),
            path.resolve(ROOT_DIR, './boldrCMS'),
            path.resolve(ROOT_DIR, './internal'),
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
                use: 'css-loader?sourceMap&importLoaders=2!postcss-loader!fast-sass-loader', // eslint-disable-line
              }),
            })),
            ifNode({
              loaders: ['css-loader/locals', 'postcss-loader', 'fast-sass-loader'],
            }),
          ),
        ),
        {
          test: /\.svg(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
        },
        {
          test: /\.(eot|woff|woff2|ttf|otf|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf|html)$/,
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
