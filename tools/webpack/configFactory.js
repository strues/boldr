import { host, wpdsPort, protocol, port } from '../../config/private/environment';
import config from '../../config/private/boldr';

const path = require('path');
const os = require('os');
const globSync = require('glob').sync;
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const colors = require('colors');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const appRoot = require('app-root-dir');
const OfflinePlugin = require('offline-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { removeEmpty, ifElse, merge, happyPackPlugin, getFilename, chalkError, chalkInfo } = require('../utils');

const appName = require('../../package.json').name;

const babel = require('./plugins/babel');
const happy = require('./plugins/happy');

const appRootPath = appRoot.get();
function webpackConfigFactory(buildOptions) {
  const { target, mode } = buildOptions;
  if (!target || ['client', 'server'].findIndex(valid => target === valid) === -1) {
    throw new Error(
      'You must provide a "target" (client|server) to the webpackConfigFactory.'
    );
  }

  if (!mode || ['development', 'production'].findIndex(valid => mode === valid) === -1) {
    throw new Error(
      'You must provide a "mode" (development|production) to the webpackConfigFactory.'
    );
  }

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
  const babelPlugin = babel.babelDevClient;
  const bundleConfig = isServer || isClient
    // This is either our "server" or "client" bundle.
    ? config.bundles[target]
    // Otherwise it must be an additional node bundle.
    : config.additionalNodeBundles[target];
  return {
    target: ifNodeTarget('node', 'web'),
    node: {
      globals: true,
      __dirname: true,
      __filename: true,
    },
    externals: removeEmpty([
      ifNodeTarget(nodeExternals({
        whitelist: [
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss)$/
        ]
      }))
    ]),
    devtool: ifElse(isNodeTarget || isDev)(
      'source-map',
      'hidden-source-map'
    ),
    // Define our entry chunks for our bundle.
    entry: merge({
      index: removeEmpty([
        ifDevClient('react-hot-loader/patch'),
        ifDevClient('webpack-hot-middleware/client?reload=true&path=http://localhost:3001/__webpack_hmr'), // eslint-disable-line
        path.resolve(appRoot.get(), bundleConfig.srcEntryFile),
      ]),
    }),
    output: merge(
         {
           // The dir in which our bundle should be output.
           path: path.resolve(appRoot.get(), bundleConfig.outputPath),
           // The filename format for our bundle's entries.
           filename: ifProdClient(
             // For our production client bundles we include a hash in the filename.
             // That way we won't hit any browser caching issues when our bundle
             // output changes.
             // Note: as we are using the WebpackMd5Hash plugin, the hashes will
             // only change when the file contents change. This means we can
             // set very aggressive caching strategies on our bundle output.
             '[name]-[chunkhash].js',
             // For any other bundle (typically a server/node) bundle we want a
             // determinable output name to allow for easier importing/execution
             // of the bundle by our scripts.
             '[name].js',
           ),
           // The name format for any additional chunks produced for the bundle.
           chunkFilename: '[name]-[chunkhash].js',
           // When in node mode we will output our bundle as a commonjs2 module.
           libraryTarget: ifNode('commonjs2', 'var'),
         },
         // This is the web path under which our webpack bundled client should
         // be considered as being served from.
         // We only need to set this for our server/client bundles as the server
         // bundle is the application that serves the client bundle.
         ifElse(isServer || isClient)({
           publicPath: ifDev(
             // As we run a seperate development server for our client and server
             // bundles we need to use an absolute http path for the public path.
             'http://localhost:3001/client/',
             // Otherwise we expect our bundled client to be served from this path.
             bundleConfig.webPath,
           ),
         }),
       ),
    resolve: {
      mainFields: ifNodeTarget(
        [ "module", "jsnext:main", "webpack", "main" ],
        [ "module", "jsnext:main", "webpack", "browser", "web", "browserify", "main" ]
      ),
      // These extensions are tried when resolving a file.
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
          // Is this the "client" bundle?
          'process.env.IS_CLIENT': JSON.stringify(isClient),
          // Is this the "server" bundle?
          'process.env.IS_SERVER': JSON.stringify(isServer),
          // Is this a node bundle?
          'process.env.IS_NODE': JSON.stringify(isNode),
          __DEV__: process.env.NODE_ENV !== 'production',
          __CLIENT__: JSON.stringify(isClient),
          __SERVER__: JSON.stringify(isServer),
        }
      ),

      ifClient(
        new WebpackMd5Hash()
      ),
      // ifProdClient(new LodashModuleReplacementPlugin()),
      ifClient(
        new AssetsPlugin({
          filename: config.bundleAssetsFileName,
          path: path.resolve(appRootPath, config.buildOutputPath, `./${target}`),
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
          // Setting this value lets the plugin know where our generated client
          // assets will be served from.
          // e.g. /client/
          publicPath: config.bundles.client.webPath,
          // When using the publicPath we need to disable the "relativePaths"
          // feature of this plugin.
          relativePaths: false,
          // Our offline support will be done via a service worker.
          // Read more on them here:
          // http://bit.ly/2f8q7Td
          ServiceWorker: {
            output: 'sw.js',
            events: true,
            // By default the service worker will be ouput and served from the
            // publicPath setting above in the root config of the OfflinePlugin.
            // This means that it would be served from /client/sw.js
            // We do not want this! Service workers have to be served from the
            // root of our application in order for them to work correctly.
            // Therefore we override the publicPath here. The sw.js will still
            // live in at the /build/client/sw.js output location therefore in
            // our server configuration we need to make sure that any requests
            // to /sw.js will serve the /build/client/sw.js file.
            publicPath: '/sw.js',
            // When a user has no internet connectivity and a path is not available
            // in our service worker cache then the following file will be
            // served to them.  Go and make it pretty. :)
            navigateFallbackURL: '/offline.html',
          },
          // We aren't going to use AppCache and will instead only rely on
          // a Service Worker.
          AppCache: false,

          // Which external files should be included with the service worker?
          // NOTE: The below config will include ALL of our public folder assets.
          // You may or may not want to be including these assets.  Feel free
          // to remove this or instead include only a very specific set of
          // assets.
          externals:
            // First do a glob match on ALL files in the public folder.
            globSync(path.resolve(appRootPath, './public', './**/*'))
            // Then map them to relative paths against the public folder.
            // We need to do this as we need to convert the file paths into
            // their respective "web" paths.
            .map(publicFile => path.relative(
              path.resolve(appRootPath, 'public'),
              publicFile
            ))
            // Add the leading "/" indicating the file is being hosted
            // off the HTTP root of the application.
            .map(relativePath => `/${relativePath}`),
        })
      ),
      happy.happyJSPlugin(babelPlugin),
      ifDevClient(happy.happyCSSPlugin),
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
      ifProdClient(
        new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', allChunks: true })
      ),
       ifDev(
         new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
       )
    ]),
    module: {
      rules: removeEmpty([
        // Javascript
        {
          test: /\.jsx?$/,
          loader: 'happypack/loader?id=happypack-javascript',
          exclude: [/node_modules/],
          include: removeEmpty([
            ...bundleConfig.srcPaths.map(srcPath =>
              path.resolve(appRoot.get(), srcPath),
            ),
            ifProdClient(path.resolve(appRoot.get(), 'src/html')),
          ]),
        },

        // JSON
        {
          test: /\.json$/,
          enforce: 'pre',
          loader: 'json-loader',
        },
        {
          test: /\.(eot|woff|woff2|ttf|otf|svg|png|jpg|jpeg|jp2|jpx|jxr|gif|webp|mp4|mp3|ogg|pdf)$/,
          loader: "file-loader",
          query: {
            name: ifProdClient("file-[hash:base62:8].[ext]", "[name].[ext]")
          }
        },
        merge(
          { test: /(\.scss|\.css)$/ },
          // When targetting the server we use the "/locals" version of the
          // css loader.
          ifNodeTarget({
            loaders: [
              'css-loader/locals',
              'postcss-loader',
              'sass-loader'
            ],
          }),
          // For a production client build we use the ExtractTextPlugin which
          // will extract our CSS into CSS files.  The plugin needs to be
          // registered within the plugins section too.
          ifProdClient({
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?sourceMap&importLoaders=2!postcss-loader!sass-loader?outputStyle=expanded&sourceMap&sourceMapContents',
            })
          })
        ),
        // For a development client we will use a straight style & css loader
        // along with source maps.  This combo gives us a better development
        // experience.
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
