'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * src/core/logger/logger.js
 * Starts a winston logging session
 *
 * @exports {EventHandler} - Winston event handler
 */
var appRoot = require('app-root-dir');

var appRootDir = appRoot.get();
var logDir = _path2.default.resolve(appRootDir + '/logs');
var tsFormat = function tsFormat() {
  return new Date().toLocaleTimeString();
};

// Only create the folder in production.
if (process.env.NODE_ENV === 'production') {
  // Create the log directory if it doesnt already exist.
  if (!_fs2.default.existsSync(logDir)) {
    _fs2.default.mkdirSync(logDir);
  }
}

var transports = [];
_winston2.default.emitErrs = true;

if (_api2.default.logger.console) {
  transports.push(new _winston2.default.transports.Console({
    handleExceptions: true,
    prettyPrint: true,
    json: false,
    colorize: true,
    level: 'debug',
    timestamp: tsFormat
  }));
}
if (_api2.default.logger.file) {
  transports.push(new (require('winston-daily-rotate-file'))({
    filename: logDir + '/apiError.log',
    timestamp: tsFormat,
    datePattern: _api2.default.dateFormat,
    prepend: true,
    level: 'error'
  }));
}

var logger = new _winston2.default.Logger({ transports: transports });
logger.exitOnError = false;
logger.stream = {
  write: function write(message) {
    logger.info(message);
  }
};
process.on('unhandledRejection', function (reason, Promise) {
  logger.warn('Unhandled rejection at ' + Promise + '\n', reason);
});
exports.logger = logger;
exports.default = logger;