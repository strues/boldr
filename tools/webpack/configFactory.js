const path = require('path');
const os = require('os');
const globSync = require('glob').sync;
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const colors = require('colors');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const appRoot = require('app-root-dir');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { removeEmpty, ifElse, merge, happyPackPlugin, chalkError, chalkInfo } = require('../utils');
const envVars = require('../config/envVars');
const defs = require('../config/defs');
const appName = require('../../package.json').name;

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
<<<<<<< HEAD
        ifClient('regenerator-runtime/runtime'),
=======
>>>>>>> develop
        `${defs.paths.src}/${target}/index.js`,
      ]),
    }),
    output: {
      // The dir in which our bundle should be output.
      path: path.resolve(appRootPath, envVars.BUNDLE_OUTPUT_PATH, `./${target}`),
      filename: ifProdClient(
        '[name]-[chunkhash].js',
        '[name].js'
      ),
      chunkFilename: '[name]-[chunkhash].js',
      // This is the web path under which our webpack bundled output should
      // be considered as being served from.
      publicPath: ifDev(
        // As we run a seperate server for our client and server bundles we
        // need to use an absolute http path for our assets public path.
        `http://localhost:${envVars.WPDS_PORT}${envVars.CLIENT_BUNDLE_HTTP_PATH}`,
        // Otherwise we expect our bundled output to be served from this path.
        envVars.CLIENT_BUNDLE_HTTP_PATH
      ),
      // When in server mode we will output our bundle as a commonjs2 module.
      libraryTarget: ifNodeTarget('commonjs2', 'var'),
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
<<<<<<< HEAD
      // happyPackPlugin({
      //   name: 'happypack-javascript',
      //   loaders: [{
      //     path: 'babel-loader',
      //     query: {
      //       babelrc: false,
      //       // cacheDirectory: path.resolve(os.tmpdir(), 'boldr', 'babelc'),
      //       presets: [['boldr', { 'es2015': { 'modules': false }}]],
      //       plugins: removeEmpty([
      //         ifDevClient('react-hot-loader/babel'),
      //           ['module-resolver', {
      //             root: ['./src/cms/common']
      //           }]
      //         ])
      //       }
      //     }
      //   ]
      // }),
=======

>>>>>>> develop
      ifProdClient(new SWPrecacheWebpackPlugin(merge({
          // Note: The default cache size is 2mb. This can be reconfigured:
          // maximumFileSizeToCacheInBytes: 2097152,
          cacheId: `${appName}-sw`,
          filepath: path.resolve(envVars.BUNDLE_OUTPUT_PATH, './serviceWorker/sw.js'),
          dynamicUrlToDependencies: (() => {
            const clientBundleAssets = globSync(
              path.resolve(appRootPath, envVars.BUNDLE_OUTPUT_PATH, './client/*.js')
            );
            return globSync(path.resolve(appRootPath, './public/*'))
              .reduce((acc, cur) => {
                // We will precache our public asset, with it being invalidated
                // any time our client bundle assets change.
                acc[`/${path.basename(cur)}`] = clientBundleAssets; // eslint-disable-line no-param-reassign,max-len
                return acc;
              },
              {
                // Our index.html page will be precatched and it will be
                // invalidated and refetched any time our client bundle
                // assets change.
                '/': clientBundleAssets,
                // Lets cache the call to the polyfill.io service too.
                'https://cdn.polyfill.io/v2/polyfill.min.js': clientBundleAssets,
              });
            })(),
          },
          ifElse(!!json)({
            // When outputing a json stat file we want to silence the output.
            verbose: false,
            logger: () => undefined,
          })
        )
      )),
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
