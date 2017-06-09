'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _serverListener = require('./serverListener');

var _serverListener2 = _interopRequireDefault(_serverListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug3.default)('boldr:dx:services:hotClient');

var DevClient = function () {
  function DevClient(compiler, config) {
    var _this = this;

    _classCallCheck(this, DevClient);

    this.config = config;

    var app = (0, _express2.default)();

    var httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    var httpPath = compiler.options.output.publicPath;

    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
      throw new Error('Development server requires an absolute public path.');
    }

    // eslint-disable-next-line no-unused-vars

    var _httpPathRegex$exec = httpPathRegex.exec(httpPath),
        _httpPathRegex$exec2 = _slicedToArray(_httpPathRegex$exec, 3),
        _ = _httpPathRegex$exec2[0],
        host = _httpPathRegex$exec2[1],
        port = _httpPathRegex$exec2[2];

    this.webpackDevMiddleware = (0, _webpackDevMiddleware2.default)(compiler, {
      quiet: true,
      noInfo: true,
      lazy: false,
      hot: true,
      watchOptions: {
        ignored: /node_modules/
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      publicPath: compiler.options.output.publicPath
    });

    app.use(this.webpackDevMiddleware);
    app.use((0, _webpackHotMiddleware2.default)(compiler));

    var devPort = parseInt(config.env.BOLDR_DEV_PORT, 10);
    var listener = app.listen(devPort, host);

    this.serverListener = new _serverListener2.default(listener, 'client');

    compiler.plugin('done', function (stats) {
      _newArrowCheck(this, _this);

      if (!stats.hasErrors()) {
        return _logger2.default.end('Running with latest changes.');
      }
      _logger2.default.error('Build failed', stats.toString());
    }.bind(this));
  }

  _createClass(DevClient, [{
    key: 'shutdown',
    value: function shutdown() {
      this.webpackDevMiddleware.close();

      return this.serverListener ? this.serverListener.shutdown() : Promise.resolve();
    }
  }]);

  return DevClient;
}();

exports.default = DevClient;