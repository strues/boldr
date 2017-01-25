/* @flow */

import path from 'path';
import webpack from 'webpack';
import { sync as globSync } from 'glob';
import AssetsPlugin from 'assets-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import appRootDir from 'app-root-dir';
import BabiliPlugin from 'babili-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import { happyPackPlugin } from '../utils';
import type { BuildOptions } from '../types';
import { removeNil } from '../../shared/core/utils/arrays';
import { mergeDeep } from '../../shared/core/utils/objects';
import { ifElse } from '../../shared/core/utils/logic';
import getConfig from '../../config/get';
import ClientConfigScript from '../../config/ClientConfigScript';

/**
 * This function is responsible for creating the webpack configuration for
 * all of our bundles.
 *
 * It has been configured to support one "client/web" bundle, and any number of
 * additional "node" bundles (i.e. our "server").  You can define additional
 * node bundles by editing the config/project.js file.
 *
 * This factory does not and will not support building multiple web target
 * bundles.  We expect there to be only one web client representing the full
 * server side rendered single page application.  Code splitting negates any
 * need for you to create multiple web bundles.  Therefore we are avoiding this
 * level of abstraction to keep the config factory as simple as possible.
 */
export default function webpackConfigFactory(buildOptions: BuildOptions) {
  const { target } = buildOptions;

  const NODE_ENV = process.env.NODE_ENV || 'development';

  const isDev = NODE_ENV === 'development';
  // Any environment but 'development' will be considered a production based build.
  const isProd = !isDev;
  const isClient = target === 'client';
  const isServer = target === 'server';
  // Any bundle but the client bundle must target node.
  const isNode = !isClient;

  // Preconfigure some ifElse helper instnaces. See the util docs for more
  // information on how this util works.
  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);
  const ifNode = ifElse(isNode);
  const ifClient = ifElse(isClient);
  const ifDevClient = ifElse(isDev && isClient);
  const ifProdClient = ifElse(isProd && isClient);

  console.log(`==> Creating "${target}" webpack config in "${isDev ? 'development' : 'production'}" mode`);

  const bundleConfig = isServer || isClient
    // This is either our "server" or "client" bundle.
    ? getConfig(['bundles', target])
    // Otherwise it must be an additional node bundle.
    : getConfig(['additionalNodeBundles', target]);

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
      ifNode(
        () => nodeExternals(
          // Some of our node_modules may contain files that depend on webpack
          // loaders, e.g. CSS or SASS.
          // For these cases please make sure that the file extensions are
          // registered within the following configuration setting.
          { whitelist:
          // We always want the source-map-support excluded.
            ['source-map-support/register'].concat(
              // Then exclude any items specified in the config.
              getConfig('nodeExternalsFileTypeWhitelist') || [],
            ),
          },
        ),
      ),
    ]),
    // Source map settings.
    devtool: ifElse(
      // Include source maps for ANY node bundle so that we can support
      // nice stack traces for errors (the source maps get consumed by
      // the `node-source-map-support` module to allow for this).
      isNode
      // Always include source maps for any development build.
      || isDev
      // Allow for the following flag to force source maps even for production
      // builds.
      || getConfig('includeSourceMapsForProductionBuilds'),
    )(
      // Produces an external source map (lives next to bundle output files).
      'source-map',
      // Produces no source map.
      'hidden-source-map',
    ),
    // Performance budget feature.
    // This enables checking of the output bundle size, which will result in
    // warnings/errors if the bundle sizes are too large.
    // We only want this enabled for our production client.  Please
    // see the webpack docs on how you can configure this to your own needs:
    // https://webpack.js.org/configuration/performance/
    performance: ifProdClient(
      // Enable webpack's performance hints for production client builds.
      { hints: 'warning' },
      // Else we have to set a value of "false" if we don't want the feature.
      false,
    ),
    entry: {
      index: removeNil([
        ifDevClient('react-hot-loader/patch'),
        ifDevClient(() => `webpack-hot-middleware/client?reload=true&path=http://${getConfig('host')}:${getConfig('clientDevServerPort')}/__webpack_hmr`), // eslint-disable-line
        // We are using polyfill.io instead of the very heavy babel-polyfill.
        // Therefore we need to add the regenerator-runtime as the babel-polyfill
        // included this, which polyfill.io doesn't include.
        ifClient('regenerator-runtime/runtime'),
        // The source entry file for the bundle.
        path.resolve(appRootDir.get(), bundleConfig.srcEntryFile),
      ]),
    },
    output: mergeDeep(
      {
        path: path.resolve(appRootDir.get(), bundleConfig.outputPath),
        filename: ifProdClient(
          '[name]-[chunkhash].js',
          '[name].js',
        ),
        chunkFilename: '[name]-[chunkhash].js',
        libraryTarget: ifNode('commonjs2', 'var'),
      },
      ifElse(isServer || isClient)(() => ({
        publicPath: ifDev(
          `http://${getConfig('host')}:${getConfig('clientDevServerPort')}${getConfig('bundles.client.webPath')}`,
          bundleConfig.webPath,
        ),
      })),
    ),

    resolve: {
      // These extensions are tried when resolving a file.
      extensions: getConfig('bundleSrcTypes').map(ext => `.${ext}`),

      // This is required for the modernizr-loader
      // @see https://github.com/peerigon/modernizr-loader
      alias: {
        modernizr$: path.resolve(appRootDir.get(), './.modernizrrc'),
      },
    },

    plugins: removeNil([
      // This grants us source map support, which combined with our webpack
      // source maps will give us nice stack traces for our node executed
      // bundles.
      // We use the BannerPlugin to make sure all of our chunks will get the
      // source maps support installed.
      ifNode(() => new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      })),

      ifClient(() => new WebpackMd5Hash()),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
        // Is this the "client" bundle?
        'process.env.IS_CLIENT': JSON.stringify(isClient),
        // Is this the "server" bundle?
        'process.env.IS_SERVER': JSON.stringify(isServer),
        // Is this a node bundle?
        'process.env.IS_NODE': JSON.stringify(isNode),
        __SERVER__: JSON.stringify(isServer),
      }),

      // Generates a JSON file containing a map of all the output files for
      // our webpack bundle.  A necessisty for our server rendering process
      // as we need to interogate these files in order to know what JS/CSS
      // we need to inject into our HTML. We only need to know the assets for
      // our client bundle.
      ifClient(() =>
        new AssetsPlugin({
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
          filename: '[name]-[chunkhash].css', allChunks: true,
        }),
      ),
      happyPackPlugin({
        name: 'hp-js',
        // We will use babel to do all our JS processing.
        loaders: [{
          path: 'babel-loader',
          // We will create a babel config and pass it through the plugin
          // defined in the project configuration, allowing additional
          // items to be added.
          query: getConfig('plugins.babelConfig')(
            // Our "standard" babel config.
            {
              // We need to ensure that we do this otherwise the babelrc will
              // get interpretted and for the current configuration this will mean
              // that it will kill our webpack treeshaking feature as the modules
              // transpilation has not been disabled within in.
              babelrc: false,
              // Faster transpiling for minor loose in formatting
              compact: true,
              cacheDirectory: true,
              // Keep origin information alive
              sourceMaps: true,
              // Nobody needs the original comments when having source maps
              comments: false,
              presets: [
                // JSX
                'react',
                // Stage 2 javascript syntax.
                'stage-2',
                // For our client bundles we transpile all the latest ratified
                // ES201X code into ES5, safe for browsers.  We exclude module
                // transilation as webpack takes care of this for us, doing
                // tree shaking in the process.
                ifClient(['latest', { es2015: { modules: false } }]),
                // For a node bundle we use the awesome babel-preset-env which
                // acts like babel-preset-latest in that it supports the latest
                // ratified ES201X syntax, however, it will only transpile what
                // is necessary for a target environment.  We have configured it
                // to target our current node version.  This is cool because
                // recent node versions have extensive support for ES201X syntax.
                // Also, we have disabled modules transpilation as webpack will
                // take care of that for us ensuring tree shaking takes place.
                // NOTE: Make sure you use the same node version for development
                // and production.
                ifNode(['env', { targets: { node: true }, modules: false }]),
              ].filter(x => x != null),

              plugins: [
                // Required to support react hot loader.
                ifDevClient('react-hot-loader/babel'),
                'lodash',
                'transform-decorators-legacy',
                ['transform-class-properties', { spec: true }],
                ['transform-object-rest-spread', { useBuiltIns: true }],
                'transform-flow-strip-types',
                'transform-es2015-arrow-functions',
                ['transform-regenerator', {
                  async: false,
                }],
                ['transform-runtime', {
                  helpers: false,
                  polyfill: false,
                  regenerator: true,
                }],
                // This decorates our components with  __self prop to JSX elements,
                // which React will use to generate some runtime warnings.
                ifDev('transform-react-jsx-self'),
                // Adding this will give us the path to our components in the
                // react dev tools.
                ifDev('transform-react-jsx-source'),
                // Replaces the React.createElement function with one that is
                // more optimized for production.
                // NOTE: Symbol needs to be polyfilled. Ensure this feature
                // is enabled in the polyfill.io configuration.
                ifProd('transform-react-inline-elements'),
                // Hoists element creation to the top level for subtrees that
                // are fully static, which reduces call to React.createElement
                // and the resulting allocations. More importantly, it tells
                // React that the subtree hasn’t changed so React can completely
                // skip it when reconciling.
                ifProd('transform-react-constant-elements'),
              ].filter(x => x != null),
            },
            buildOptions,
          ),
        }],
      }),
      ifDevClient(
        () => happyPackPlugin({
          name: 'hp-scss',
          loaders: [
            { path: 'style-loader' },
            {
              path: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]',
                modules: false,
                sourceMap: true,
              },
            },
            { path: 'postcss-loader' },
            {
              path: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
              },
            },
          ],
        }),
      ),
    ]),
    module: {
      rules: removeNil([
        {
          test: /\.jsx?$/,
          loader: 'happypack/loader?id=hp-js',
          include: removeNil([
            ...bundleConfig.srcPaths.map(srcPath =>
              path.resolve(appRootDir.get(), srcPath),
            ),
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
              loaders: [
                'css-loader/locals',
                'postcss-loader',
                'sass-loader',
              ],
            }),
          ),
        ),
        // ASSETS (Images/Fonts/etc)
        // This is bound to our server/client bundles as we only expect to be
        // serving the client bundle as a Single Page Application through the
        // server.
        ifElse(isClient || isServer)(() => ({
          test: new RegExp(`\\.(${getConfig('bundleAssetTypes').join('|')})$`, 'i'),
          loader: 'file-loader',
          query: {
            // What is the web path that the client bundle will be served from?
            // The same value has to be used for both the client and the
            // server bundles in order to ensure that SSR paths match the
            // paths used on the client.
            publicPath: isDev
              // When running in dev mode the client bundle runs on a
              // seperate port so we need to put an absolute path here.
              ? `http://${getConfig('host')}:${getConfig('clientDevServerPort')}${getConfig('bundles.client.webPath')}`
              // Otherwise we just use the configured web path for the client.
              : getConfig('bundles.client.webPath'),
            // We only emit files when building a web bundle, for the server
            // bundle we only care about the file loader being able to create
            // the correct asset URLs.
            emitFile: isClient,
          },
        })),
        // MODERNIZR
        // This allows you to do feature detection.
        // @see https://modernizr.com/docs
        // @see https://github.com/peerigon/modernizr-loader
        ifClient({
          test: /\.modernizrrc.js$/,
          loader: 'modernizr-loader',
        }),
        ifClient({
          test: /\.modernizrrc(\.json)?$/,
          loader: 'modernizr-loader!json-loader',
        }),
      ]),
    },
  };
// Apply the configuration middleware.
  return getConfig('plugins.webpackConfig')(webpackConfig, buildOptions);
}
