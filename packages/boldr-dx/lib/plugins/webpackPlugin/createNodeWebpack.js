'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNodeWebpack;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _removeNil = require('boldr-utils/lib/arrays/removeNil');

var _removeNil2 = _interopRequireDefault(_removeNil);

var _ifElse = require('boldr-utils/lib/logic/ifElse');

var _ifElse2 = _interopRequireDefault(_ifElse);

var _appRoot = require('boldr-utils/lib/node/appRoot');

var _appRoot2 = _interopRequireDefault(_appRoot);

var _writeFileWebpackPlugin = require('write-file-webpack-plugin');

var _writeFileWebpackPlugin2 = _interopRequireDefault(_writeFileWebpackPlugin);

var _progressBarWebpackPlugin = require('progress-bar-webpack-plugin');

var _progressBarWebpackPlugin2 = _interopRequireDefault(_progressBarWebpackPlugin);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _circularDependencyPlugin = require('circular-dependency-plugin');

var _circularDependencyPlugin2 = _interopRequireDefault(_circularDependencyPlugin);

var _paths = require('../../config/paths');

var _paths2 = _interopRequireDefault(_paths);

var _LoggerPlugin = require('./plugins/LoggerPlugin');

var _LoggerPlugin2 = _interopRequireDefault(_LoggerPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } } /* eslint-disable max-lines, prefer-template */


var debug = (0, _debug3.default)('boldr:dx:webpack:createNodeWebpack');
var CWD = _appRoot2.default.get();
var prefetches = [];

var prefetchPlugins = prefetches.map(function (specifier) {
  _newArrowCheck(undefined, undefined);

  return new _webpack2.default.PrefetchPlugin(specifier);
}.bind(undefined));
var cache = {
  'server-production': {},
  'server-development': {}
};

// This is the Webpack configuration for Node
function createNodeWebpack() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      config = _ref.config,
      _ref$mode = _ref.mode,
      mode = _ref$mode === undefined ? 'development' : _ref$mode,
      _ref$name = _ref.name,
      name = _ref$name === undefined ? 'server' : _ref$name;

  debug('MODE: ', mode);
  _fs2.default.writeFile('nodeconfig.json', JSON.stringify(config), 'utf8', function (err) {
    _newArrowCheck(this, _this);

    if (err) {
      return debug(err);
    }
  }.bind(this));
  var envVariables = config.env,
      bundle = config.bundle;

  process.env.BABEL_ENV = mode;

  var _DEV = mode === 'development';
  var _PROD = mode === 'production';
  var _DEBUG = envVariables.BOLDR_DEBUG === '1';
  var ifDev = (0, _ifElse2.default)(_DEV);
  var ifProd = (0, _ifElse2.default)(_PROD);
  var ifNodeDeubg = (0, _ifElse2.default)(_DEBUG);

  var BOLDR_DEV_PORT = parseInt(envVariables.BOLDR_DEV_PORT, 10) || 3001;
  var EXCLUDES = [/node_modules/, bundle.client.bundleDir, bundle.server.bundleDir, bundle.publicDir];

  var nodeConfig = {
    // pass either node or web
    target: 'node',
    // user's project root
    context: _appRoot2.default.get(),
    // sourcemap
    devtool: '#source-map',
    entry: [require.resolve('./polyfills/node'), bundle.server.entry],
    output: {
      path: bundle.server.bundleDir,
      filename: 'server.js',
      publicPath: ifDev('http://localhost:' + String(BOLDR_DEV_PORT),
      // Otherwise we expect our bundled output to be served from this path.
      bundle.webPath),
      // only prod
      pathinfo: _DEV,
      libraryTarget: 'commonjs2'
    },
    // true if prod
    bail: _PROD,
    // cache dev
    cache: cache['server-' + String(mode)],
    // true if prod & enabled in settings
    profile: _PROD && bundle.wpProfile,
    node: {
      console: true,
      __filename: true,
      __dirname: true,
      fs: true
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
      mainFields: ['module', 'jsnext:main', 'main'],
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
    externals: (0, _webpackNodeExternals2.default)({
      whitelist: ['source-map-support/register', /\.(eot|woff|woff2|ttf|otf)$/, /\.(svg|png|jpg|jpeg|gif|ico)$/, /\.(mp4|mp3|ogg|swf|webp)$/, /\.(css|scss)$/]
    }),
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
        }), {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            compact: true,
            sourceMaps: true,
            comments: false,
            cacheDirectory: _DEV,
            presets: [[require.resolve('babel-preset-boldr/node'), {
              debug: true,
              useBuiltins: true,
              targets: {
                node: 8
              },
              exclude: ['transform-regenerator', 'transform-async-to-generator']
            }]],
            plugins: [[require.resolve('babel-plugin-styled-components'), {
              ssr: true
            }]]
          }
        }])
      }, {
        test: /\.css$/,
        exclude: EXCLUDES,
        use: ['css-loader/locals', 'postcss-loader']
      },
      // scss
      {
        test: /\.scss$/,
        exclude: EXCLUDES,
        use: ['css-loader/locals', 'postcss-loader', 'fast-sass-loader']
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
        options: { limit: 10000, emitFile: false }
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
          emitFile: false
        }
      }])
    },
    plugins: (0, _removeNil2.default)([].concat(_toConsumableArray(prefetchPlugins), [new _webpack2.default.LoaderOptionsPlugin({
      minimize: _PROD,
      debug: !_PROD,
      context: CWD
    }), new _progressBarWebpackPlugin2.default({
      format: String(_chalk2.default.cyan.bold('Boldr')) + ' status [:bar] ' + String(_chalk2.default.magenta(':percent')) + ' (:elapsed seconds)',
      clear: false,
      summary: true
    }), new _webpack2.default.optimize.LimitChunkCountPlugin({ maxChunks: 1 }), new _webpack2.default.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(mode)
    }), new _webpack2.default.DefinePlugin({
      __IS_DEV__: JSON.stringify(_DEV),
      __IS_SERVER__: JSON.stringify(true),
      __IS_CLIENT__: JSON.stringify(false),
      __CHUNK_MANIFEST__: JSON.stringify(_path2.default.join(bundle.assetsDir || '', 'chunk-manifest.json')),
      __ASSETS_MANIFEST__: JSON.stringify(_path2.default.join(bundle.assetsDir || '', 'assets-manifest.json'))
    }),
    // case sensitive paths
    ifDev(function () {
      _newArrowCheck(this, _this);

      return new _caseSensitivePathsWebpackPlugin2.default();
    }.bind(this)), ifDev(function () {
      _newArrowCheck(this, _this);

      return new _LoggerPlugin2.default({
        verbose: bundle.verbose,
        target: 'server'
      });
    }.bind(this)), ifDev(function () {
      _newArrowCheck(this, _this);

      return new _circularDependencyPlugin2.default({
        exclude: /a\.js|node_modules/,
        // show a warning when there is a circular dependency
        failOnError: false
      });
    }.bind(this))]))
  };

  if (_DEV) {
    nodeConfig.stats = 'none';
    nodeConfig.watch = true;
    nodeConfig.plugins.push(new _writeFileWebpackPlugin2.default({ log: false }));
  }
  return nodeConfig;
}