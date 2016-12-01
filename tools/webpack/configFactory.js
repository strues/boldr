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
const envVars = require('../config/envVars');
const defs = require('../config/defs');
const appName = require('../../package.json').name;
const config = require('../config');
const babel = require('./plugins/babel');
const happy = require('./plugins/happy');

const appRootPath = appRoot.get();
function webpackConfigFactory({ target, mode }, { json }) {
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

  if (!json) {
    // 1
    console.log(`==> Creating webpack config for "${target}" in "${mode}" mode`);
  }

  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const isClient = target === 'client';
  const isServer = target === 'server';
  const isUniversalMiddleware = target === 'universalMiddleware';
  const isNodeTarget = isServer || isUniversalMiddleware;

  const ifNodeTarget = ifElse(isNodeTarget);
  const ifDev = ifElse(isDev);
  const ifProd = ifElse(isProd);
  const ifClient = ifElse(isClient);
  const ifServer = ifElse(isServer);
  const ifDevServer = ifElse(isDev && isServer);
  const ifDevClient = ifElse(isDev && isClient);
  const ifProdClient = ifElse(isProd && isClient);
  const babelPlugin = babel.babelDevClient;

  return {
    target: ifNodeTarget('node', 'web'),
    node: {
      globals: true,
      __dirname: true,
      __filename: true,
    },
    externals: removeEmpty([
      // Don't allow the server to bundle the universal middleware bundle. We
      // want the server to natively require it from the build dir.
      ifServer(/\.\.[/\\]universalMiddleware/),
      ifDevServer(/development[/\\]universalDevMiddleware/),
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
        ifDevClient(`webpack-hot-middleware/client?reload=true&path=http://localhost:${envVars.WPDS_PORT}/__webpack_hmr`), // eslint-disable-line
        `${defs.paths.src}/${target}/index.js`,
      ]),
    }),
    output: {
      // The dir in which our bundle should be output.
      path: isServer
        ? config.paths.serverBundle
        : config.paths.clientBundle,
      // The filename format for our bundle's entries.
      filename: ifProdClient(
        // We include a hash for client caching purposes.  Including a unique
        // has for every build will ensure browsers always fetch our newest
        // bundle.
        '[name]-[chunkhash].js',
        // We want a determinable file name when running our server bundles,
        // as we need to be able to target our server start file from our
        // npm scripts.  We don't care about caching on the server anyway.
        // We also want our client development builds to have a determinable
        // name for our hot reloading client bundle server.
        '[name].js'
      ),
      chunkFilename: '[name]-[chunkhash].js',
      // This is the web path under which our webpack bundled output should
      // be considered as being served from.
      publicPath: ifDev(
        // As we run a seperate server for our client and server bundles we
        // need to use an absolute http path for our assets public path.
        `${config.server.protocol}://${config.server.host}:${config.development.clientDevServerPort}${config.client.webRoot}`,
        // Otherwise we expect our bundled output to be served from this path.
        config.client.webRoot
      ),
      // When in server mode we will output our bundle as a commonjs2 module.
      libraryTarget: ifServer('commonjs2', 'var'),
    },
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
        merge(
          {
            'process.env.NODE_ENV': JSON.stringify(mode),
            'process.env.IS_NODE': JSON.stringify(isNodeTarget),
            __DEV__: process.env.NODE_ENV !== 'production',
            __CLIENT__: true,
            __SERVER__: false
          },
          Object.keys(envVars).reduce((acc, cur) => {
            acc[`process.env.${cur}`] = JSON.stringify(envVars[cur]); // eslint-disable-line no-param-reassign
            return acc;
          }, {})
        )
      ),

      ifClient(
        new WebpackMd5Hash()
      ),
      // ifProdClient(new LodashModuleReplacementPlugin()),
      ifClient(
        new AssetsPlugin({
          filename: envVars.BUNDLE_ASSETS_FILENAME,
          path: path.resolve(appRootPath, envVars.BUNDLE_OUTPUT_PATH, `./${target}`),
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
          publicPath: config.client.webRoot,
          // When using the publicPath we need to disable the "relativePaths"
          // feature of this plugin.
          relativePaths: false,
          // Our offline support will be done via a service worker.
          // Read more on them here:
          // http://bit.ly/2f8q7Td
          ServiceWorker: {
            output: `${config.serviceWorker.name}.js`,
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
            publicPath: `/${config.serviceWorker.name}.js`,
            // When a user has no internet connectivity and a path is not available
            // in our service worker cache then the following file will be
            // served to them.  Go and make it pretty. :)
            navigateFallbackURL: config.serviceWorker.navigateFallbackURL,
          },
          // We aren't going to use AppCache and will instead only rely on
          // a Service Worker.
          AppCache: false,
          // NOTE: This will include ALL of our public folder assets.  We do
          // a glob pull of them and then map them to /foo paths as all the
          // public folder assets get served off the root of our application.
          // You may or may not want to be including these assets.  Feel free
          // to remove this or instead include only a very specific set of
          // assets.
          externals: globSync(`${config.paths.publicAssets}/**/*`)
            .map(publicFile => `/${getFilename(publicFile)}`),
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
        ifDev({
          test: /\.jsx?$/,
          loader: 'happypack/loader?id=happypack-javascript',
          exclude: [/node_modules/],
          include: [defs.paths.src],
        }),
        ifProd({
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/],
          include: [defs.paths.src],
          query: babel.babelProd,
        }),
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
