import path from 'path';
import os from 'os';
import appRootDir from 'app-root-dir';
import { host, wpdsPort, protocol, port } from '../../config/private/environment';
import config from '../../config/private/boldr';
import plugins from '../../config/private/plugins';

const globSync = require('glob').sync;
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { removeEmpty, ifElse, merge, happyPackPlugin } = require('../utils');
const appName = require('../../package.json').name;

function webpackConfigFactory(buildOptions) {
  const { target, mode } = buildOptions;
  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const isClient = target === 'client';
  const isServer = target === 'server';
  const isUniversalMiddleware = target === 'universalMiddleware';
  const isNodeTarget = isServer || isUniversalMiddleware;
  const isNode = !isClient;
  const ifNodeTarget = ifElse(isNodeTarget);
  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);
  const ifClient = ifElse(isClient);
  const ifServer = ifElse(isServer);
  const ifNode = ifElse(isNode);
  const ifDevServer = ifElse(isDev && isServer);
  const ifDevClient = ifElse(isDev && isClient);
  const ifProdClient = ifElse(isProd && isClient);

  const bundleConfig = isServer || isClient ? config.bundles[target] : config.additionalNodeBundles[target];

  return {
    target: ifNodeTarget('node', 'web'),
    node: {
      globals: true,
      __dirname: true,
      __filename: true,
    },
    externals: removeEmpty([
      ifNode(nodeExternals({ whitelist: config.nodeBundlesIncludeNodeModuleFileTypes })),
    ]),
    devtool: ifElse(isNodeTarget || isDev)(
      '#cheap-module-source-map',
      'hidden-source-map'
    ),
    entry: merge({
      index: removeEmpty([
        ifDevClient('react-hot-loader/patch'),
        ifDevClient('webpack-hot-middleware/client?reload=true&path=http://localhost:3001/__webpack_hmr'), // eslint-disable-line
        path.resolve(appRootDir.get(), bundleConfig.srcEntryFile),
      ]),
    }),
    output: merge(
     {
       path: path.resolve(appRootDir.get(), bundleConfig.outputPath),
       filename: ifProdClient(
         '[name]-[chunkhash].js',
         '[name].js',
       ),
       chunkFilename: '[name]-[chunkhash].js',
       libraryTarget: ifNode('commonjs2', 'var'),
     },
     ifElse(isServer || isClient)({
       publicPath: ifDev(
         'http://localhost:3001/client/',
         bundleConfig.webPath,
       ),
     }),
    ),
    resolve: {
      mainFields: ifNodeTarget(
        [ 'module', 'jsnext:main', 'webpack', 'main' ],
        [ 'module', 'jsnext:main', 'webpack', 'browser', 'web', 'browserify', 'main' ]
      ),
      extensions: [
        '.js',
        '.jsx',
        '.json',
      ]
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin(
        {
          'process.env.NODE_ENV': JSON.stringify(mode),
          'process.env.IS_CLIENT': JSON.stringify(isClient),
          'process.env.IS_SERVER': JSON.stringify(isServer),
          'process.env.IS_NODE': JSON.stringify(isNode),
          __SERVER__: JSON.stringify(isServer),
        }
      ),

      ifClient(
        new WebpackMd5Hash()
      ),
      ifClient(
        new AssetsPlugin({
          filename: config.bundleAssetsFileName,
          path: path.resolve(appRootDir.get(), config.buildOutputPath, `./${target}`),
        })
      ),
      ifDev(new webpack.NoErrorsPlugin()),
      ifDevClient(new webpack.HotModuleReplacementPlugin()),
      ifClient(
        new webpack.LoaderOptionsPlugin({
          minimize: ifProd(true, false),
          debug: false,
          context: __dirname
        })
      ),
      ifProdClient(new OfflinePlugin({
          publicPath: config.bundles.client.webPath,
          relativePaths: false,
          ServiceWorker: {
            output: 'sw.js',
            events: true,
            publicPath: '/sw.js',
            navigateFallbackURL: '/offline.html',
          },
          AppCache: false,
          externals:
            globSync(path.resolve(appRootDir.get(), './public', './**/*'))
            .map(publicFile => path.relative(
              path.resolve(appRootDir.get(), 'public'),
              publicFile
            ))
            .map(relativePath => `/${relativePath}`),
        })
      ),
      happyPackPlugin({
        name: 'happypack-javascript',
        loaders: [{
          path: 'babel-loader',
          query: plugins.bundles.babelConfig(buildOptions),
        }],
      }),
      ifDevClient(happyPackPlugin({
          name: 'happypack-devclient-css',
          loaders: [
            { path: 'style-loader' },
            {
              path: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]',
                modules: true,
                sourceMap: true
              }
            },
            { path: 'postcss-loader' },
            {
              path: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true
              }
            }
          ]
        })
      ),
      ifProdClient(
        new webpack.optimize.UglifyJsPlugin({
          // sourceMap: true,
          compress: {
            screw_ie8: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          },
        })
      ),
      ifServer(new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      })),

      ifProdClient(
        new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', allChunks: true })
      ),
    ]),
    module: {
      rules: removeEmpty([
        {
          test: /\.jsx?$/,
          loader: 'happypack/loader?id=happypack-javascript',
          exclude: [/node_modules/],
          include: removeEmpty([
            ...bundleConfig.srcPaths.map(srcPath =>
              path.resolve(appRootDir.get(), srcPath),
            ),
            ifProdClient(path.resolve(appRootDir.get(), 'src/html')),
          ]),
        },
        {
          test: /\.json$/,
          enforce: 'pre',
          loader: 'json-loader',
        },
        {
          test: /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf)$/,
          loader: 'file-loader',
          query: {
            name: ifProdClient('file-[hash:base62:8].[ext]', '[name].[ext]')
          }
        },
        merge(
          { test: /(\.scss|\.css)$/ },
          ifNodeTarget({
            loaders: [
              'css-loader/locals',
              'postcss-loader',
              'sass-loader'
            ],
          }),
          ifProdClient({
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?sourceMap&importLoaders=2!postcss-loader!sass-loader?outputStyle=expanded&sourceMap&sourceMapContents',
            })
          })
        ),
        ifDevClient({
          test: /(\.scss|\.css)$/,
          loaders: ['happypack/loader?id=happypack-devclient-css']
        })
      ]),
      noParse: /\.min\.js/
    },
  };
}

module.exports = webpackConfigFactory;
