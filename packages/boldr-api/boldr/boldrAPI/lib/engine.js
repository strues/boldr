'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/* istanbul ignore next */
var startEngine = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bootstrap2.default.init();

          case 2:
            server.listen(port);
            _logger2.default.info('\uD83C\uDF0E  ==> Starting ' + appName + ' on ' + port);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function startEngine() {
    return _ref.apply(this, arguments);
  };
}();

require('babel-polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _appRootDir = require('app-root-dir');

var _appRootDir2 = _interopRequireDefault(_appRootDir);

var _api = require('../config/api');

var _api2 = _interopRequireDefault(_api);

var _bootstrap = require('./core/bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _logger = require('./core/logger');

var _logger2 = _interopRequireDefault(_logger);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = require('bluebird');
var debug = require('debug')('boldrAPI:engine');

var port = normalizePort(_api2.default.port);
var appName = _api2.default.app + ' @ v' + _api2.default.version;

require('dotenv').load({ silent: true });

global.Promise = Promise;
Promise.longStackTraces();

var ssl = {
  key: _fs2.default.readFileSync((0, _path.resolve)(_appRootDir2.default.get(), './config/ssl.key')),
  cert: _fs2.default.readFileSync((0, _path.resolve)(_appRootDir2.default.get(), './config/ssl.crt'))
};

_app2.default.set('port', port);
_app2.default.set('json spaces', 2);
var server = _http2.default.createServer(_app2.default);

process.on('SIGTERM', function () {
  return close(server);
});
process.on('SIGINT', function () {
  return close(server);
});
server.on('listening', onListening);
server.on('error', onError);

(0, _setImmediate3.default)(startEngine);

exports.default = server;
/* istanbul ignore else */

function close(server) {
  return new Promise(function (resolve) {
    server.close(function () {
      var msg = 'BoldrAPI shutting down...';

      _logger2.default.info(msg);
      resolve(msg);
      if (server) {
        server.close(process.exit.bind(process));
      } else {
        process.exit();
      }
    });
  });
}
/* istanbul ignore next */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/* istanbul ignore next */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Normalize a port into a number, string, or false.
 * @param {Number|String} val
 */
/* istanbul ignore next */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}