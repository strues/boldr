'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createBrowserWebpack;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _removeNil = require('boldr-utils/lib/arrays/removeNil');

var _removeNil2 = _interopRequireDefault(_removeNil);

var _ifElse = require('boldr-utils/lib/logic/ifElse');

var _ifElse2 = _interopRequireDefault(_ifElse);

var _mergeDeep = require('boldr-utils/lib/objects/mergeDeep');

var _mergeDeep2 = _interopRequireDefault(_mergeDeep);

var _filterEmpty = require('boldr-utils/lib/objects/filterEmpty');

var _filterEmpty2 = _interopRequireDefault(_filterEmpty);

var _appRoot = require('boldr-utils/lib/node/appRoot');

var _appRoot2 = _interopRequireDefault(_appRoot);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _progressBarWebpackPlugin = require('progress-bar-webpack-plugin');

var _progressBarWebpackPlugin2 = _interopRequireDefault(_progressBarWebpackPlugin);

var _assetsWebpackPlugin = require('assets-webpack-plugin');

var _assetsWebpackPlugin2 = _interopRequireDefault(_assetsWebpackPlugin);

var _webpackBundleAnalyzer = require('webpack-bundle-analyzer');

var _chunkManifestWebpackPlugin = require('chunk-manifest-webpack-plugin');

var _chunkManifestWebpackPlugin2 = _interopRequireDefault(_chunkManifestWebpackPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _statsWebpackPlugin = require('stats-webpack-plugin');

var _statsWebpackPlugin2 = _interopRequireDefault(_statsWebpackPlugin);

var _circularDependencyPlugin = require('circular-dependency-plugin');

var _circularDependencyPlugin2 = _interopRequireDefault(_circularDependencyPlugin);

var _paths = require('../../config/paths');

var _paths2 = _interopRequireDefault(_paths);

var _happyPackPlugin = require('./plugins/happyPackPlugin');

var _happyPackPlugin2 = _interopRequireDefault(_happyPackPlugin);

var _LoggerPlugin = require('./plugins/LoggerPlugin');

var _LoggerPlugin2 = _interopRequireDefault(_LoggerPlugin);

var _helpers = require('./util/helpers');

var _baseWebpackConfig = require('./baseWebpackConfig');

var _baseWebpackConfig2 = _interopRequireDefault(_baseWebpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } } /* eslint-disable max-lines, prefer-template */

var debug = (0, _debug3.default)('boldr:dx:webpack:createBrowserWebpack');

var LOCAL_IDENT = '[name]__[local]___[hash:base64:5]';
var CWD = _appRoot2.default.get();
var prefetches = [];

var prefetchPlugins = prefetches.map(function (specifier) {
  _newArrowCheck(undefined, undefined);

  return new _webpack2.default.PrefetchPlugin(specifier);
}.bind(undefined));

var cache = {
  'client-production': {},
  'client-development': {}
};

function createBrowserWebpack() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      config = _ref.config,
      _ref$mode = _ref.mode,
      mode = _ref$mode === undefined ? 'development' : _ref$mode,
      _ref$name = _ref.name,
      name = _ref$name === undefined ? 'client' : _ref$name;

  var envVariables = config.env,
      bundle = config.bundle;


  process.env.BABEL_ENV = mode;

  var _DEV = mode === 'development';
  var _PROD = mode === 'production';

  var ifDev = (0, _ifElse2.default)(_DEV);
  var ifProd = (0, _ifElse2.default)(_PROD);

  var BOLDR_DEV_PORT = parseInt(envVariables.BOLDR_DEV_PORT, 10) || 3001;

  var EXCLUDES = [/node_modules/, bundle.client.bundleDir, bundle.server.bundleDir, bundle.publicDir];

  var browserConfig = {
    // pass either node or web
    target: 'web',
    // user's project root
    context: _baseWebpackConfig2.default.context,
    // sourcemap
    devtool: _DEV ? 'cheap-eval-source-map' : 'source-map',
    entry: (0, _filterEmpty2.default)({
      app: (0, _removeNil2.default)([ifDev(require.resolve('react-hot-loader/patch')), String(require.resolve('webpack-hot-middleware/client')) + '?path=http://localhost:' + String(BOLDR_DEV_PORT) + '/__webpack_hmr&timeout=3000', require.resolve('./polyfills/browser'), bundle.client.entry]),
      vendor: ifProd(bundle.vendor)
    }),
    output: {
      path: bundle.client.bundleDir,
      filename: _DEV ? '[name].js' : '[name]-[chunkhash].js',
      chunkFilename: _DEV ? '[name]-[hash].js' : '[name]-[chunkhash].js',
      publicPath: ifDev('http://localhost:' + String(BOLDR_DEV_PORT) + '/',
      // Otherwise we expect our bundled output to be served from this path.
      bundle.webPath),
      // only dev
      pathinfo: _DEV,
      libraryTarget: 'var',
      strictModuleExceptionHandling: true
    },
    // true if prod
    bail: _baseWebpackConfig2.default.bail,
    // cache dev
    cache: _baseWebpackConfig2.default.cache,
    // true if prod & enabled in settings
    profile: _PROD && bundle.wpProfile,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      console: true,
      __filename: true,
      __dirname: true
    },
    performance: false,
    stats: {
      colors: true,
      reasons: bundle.debug,
      hash: bundle.verbose,
      version: bundle.verbose,
      timings: true,
      chunks: bundle.verbose,
      chunkModules: bundle.verbose,
      cached: bundle.verbose,
      cachedAssets: bundle.verbose
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: ['node_modules', _paths2.default.projectNodeModules].concat(_paths2.default.nodePaths),
      mainFields: ['web', 'browser', 'style', 'module', 'jsnext:main', 'main'],
      descriptionFiles: ['package.json'],
      alias: {
        '~scenes': _paths2.default.scenesDir,
        '~state': _paths2.default.stateDir,
        '~admin': _paths2.default.adminDir,
        '~blog': _paths2.default.blogDir,
        '~components': _paths2.default.componentsDir,
        '~core': _paths2.default.coreDir,
        '~templates': _paths2.default.tmplDir
      }
    },
    resolveLoader: {
      modules: [_paths2.default.boldrNodeModules, _paths2.default.projectNodeModules]
    },
    module: {
      noParse: [/\.min\.js/],
      rules: (0, _removeNil2.default)([
      // js
      {
        test: /\.(js|jsx)$/,
        include: bundle.srcDir,
        exclude: EXCLUDES,
        use: (0, _removeNil2.default)([ifDev({
          loader: 'cache-loader',
          options: {
            // provide a cache directory where cache items should be stored
            cacheDirectory: _paths2.default.cacheDir
          }
        }), 'happypack/loader?id=hp-js'])
      },
      // css
      {
        test: /\.css$/,
        exclude: EXCLUDES,
        use: _DEV ? [{ loader: 'happypack/loader?id=hp-css' }] : _extractTextWebpackPlugin2.default.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: bundle.cssModules,
              minimize: true,
              autoprefixer: false,
              importLoaders: 1,
              context: bundle.srcDir,
              localIdentName: '[hash:base64:5]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              // https://webpack.js.org/guides/migrating/#complex-options
              ident: 'postcss',
              plugins: _helpers.postCssConfig
            }
          }]
        })
      },
      // scss
      {
        test: /\.scss$/,
        exclude: EXCLUDES,
        use: _DEV ? [{ loader: 'happypack/loader?id=hp-scss' }] : _extractTextWebpackPlugin2.default.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[hash:base64:5]',
              context: bundle.srcDir,
              sourceMap: false,
              modules: false
            }
          }, { loader: 'postcss-loader' }, {
            loader: 'fast-sass-loader'
          }]
        })
      },
      // json
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // url
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        exclude: EXCLUDES,
        options: { limit: 10000, emitFile: true }
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        exclude: EXCLUDES,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]' // eslint-disable-line
      },
      // file
      {
        test: /\.(ico|eot|ttf|otf|mp4|mp3|ogg|pdf|html)$/, // eslint-disable-line
        loader: 'file-loader',
        exclude: EXCLUDES,
        options: {
          emitFile: true
        }
      }])
    },
    plugins: (0, _removeNil2.default)([].concat(_toConsumableArray(prefetchPlugins), [new _webpack2.default.LoaderOptionsPlugin({
      minimize: !_DEV,
      debug: _DEV,
      context: CWD
    }), new _progressBarWebpackPlugin2.default({
      format: String(_chalk2.default.cyan.bold('Boldr')) + ' status [:bar] ' + String(_chalk2.default.magenta(':percent')) + ' (:elapsed seconds)',
      clear: false,
      summary: true
    }), new _webpack2.default.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(mode)
    }), new _webpack2.default.DefinePlugin({
      __IS_DEV__: JSON.stringify(_DEV),
      __IS_SERVER__: JSON.stringify(false),
      __IS_CLIENT__: JSON.stringify(true),
      __CHUNK_MANIFEST__: JSON.stringify(_path2.default.join(bundle.assetsDir || '', 'chunk-manifest.json')),
      __ASSETS_MANIFEST__: JSON.stringify(_path2.default.join(bundle.assetsDir || '', 'assets-manifest.json')),
      'process.browser': JSON.stringify(true),
      'process.server': JSON.stringify(false)
    }), (0, _happyPackPlugin2.default)({
      name: 'hp-js',
      loaders: [{
        path: 'babel-loader',
        query: {
          babelrc: false,
          compact: true,
          sourceMaps: true,
          comments: false,
          cacheDirectory: _DEV,
          presets: [[require.resolve('babel-preset-boldr/browser'), {
            useBuiltins: true,
            exclude: ['transform-regenerator', 'transform-async-to-generator']
          }]],
          plugins: (0, _removeNil2.default)([ifDev(require.resolve('react-hot-loader/babel')), [require.resolve('babel-plugin-styled-components'), {
            ssr: true
          }], [require.resolve('./util/loadableBabel.js'), {
            server: true,
            webpack: true
          }]])
        }
      }]
    }), ifDev(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.NamedModulesPlugin();
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.HashedModuleIdsPlugin();
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function minChunks(module) {
          // A module is extracted into the vendor chunk when...
          return (
            // If it's inside node_modules
            /node_modules/.test(module.context) &&
            // Do not externalize if the request is a CSS file
            !/\.(css|less|scss|sass|styl|stylus)$/.test(module.request)
          );
        }
      });
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: Infinity
      });
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        minChunks: 4
      });
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new BabiliPlugin({}, { comments: false });
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _extractTextWebpackPlugin2.default({
        filename: '[name]-[contenthash:8].css',
        allChunks: true,
        ignoreOrder: bundle.cssModules
      });
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.optimize.AggressiveMergingPlugin();
    }.bind(this)),
    // case sensitive paths
    ifDev(function () {
      _newArrowCheck(this, _this);

      return new _caseSensitivePathsWebpackPlugin2.default();
    }.bind(this)), ifDev(function () {
      _newArrowCheck(this, _this);

      return new _circularDependencyPlugin2.default({
        exclude: /a\.js|node_modules/,
        // show a warning when there is a circular dependency
        failOnError: false
      });
    }.bind(this)), ifDev(function () {
      _newArrowCheck(this, _this);

      return new _LoggerPlugin2.default({
        verbose: bundle.verbose,
        target: 'web'
      });
    }.bind(this)), new _assetsWebpackPlugin2.default({
      filename: 'assets-manifest.json',
      path: bundle.assetsDir,
      prettyPrint: true
    }), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _statsWebpackPlugin2.default('stats.json', {
        chunkModules: true,
        exclude: [/node_modules[\\/]react/]
      });
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _chunkManifestWebpackPlugin2.default({
        filename: 'chunk-manifest.json',
        manifestVariable: 'CHUNK_MANIFEST'
      });
    }.bind(this)),
    // Errors during development will kill any of our NodeJS processes.
    // this prevents that from happening.
    ifDev(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.NoEmitOnErrorsPlugin();
    }.bind(this)),
    //  We need this plugin to enable hot module reloading
    ifDev(function () {
      _newArrowCheck(this, _this);

      return new _webpack2.default.HotModuleReplacementPlugin();
    }.bind(this)), ifProd(function () {
      _newArrowCheck(this, _this);

      return new _webpackBundleAnalyzer.BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        logLevel: 'error'
      });
    }.bind(this))]))
  };
  if (_DEV) {
    browserConfig.plugins.push((0, _happyPackPlugin2.default)({
      name: 'hp-css',
      loaders: [{ path: 'style-loader' }, {
        path: 'css-loader',
        use: {
          autoprefixer: false,
          modules: bundle.cssModules,
          minimize: false,
          importLoaders: 1,
          context: bundle.srcDir,
          localIdentName: LOCAL_IDENT
        }
      }, {
        path: 'postcss-loader',
        use: {
          // https://webpack.js.org/guides/migrating/#complex-options
          ident: 'postcss',
          plugins: _helpers.postCssConfig
        }
      }]
    }), (0, _happyPackPlugin2.default)({
      name: 'hp-scss',
      loaders: [{ path: 'style-loader' }, {
        path: 'css-loader',
        use: {
          importLoaders: 2,
          localIdentName: LOCAL_IDENT,
          sourceMap: false,
          modules: false,
          context: bundle.srcDir
        }
      }, { path: 'postcss-loader' }, {
        path: 'fast-sass-loader'
      }]
    }), new _webpack2.default.DllReferencePlugin({
      manifest: require(_path2.default.resolve(bundle.assetsDir, '__vendor_dlls__.json'))
    }));
  }
  return browserConfig;
}