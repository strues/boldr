'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _clearConsole = require('react-dev-utils/clearConsole');

var _clearConsole2 = _interopRequireDefault(_clearConsole);

var _formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

var _formatWebpackMessages2 = _interopRequireDefault(_formatWebpackMessages);

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IS_COMPILING = false;
var IS_DONE = false;

var LoggerPlugin = function () {
  function LoggerPlugin(options) {
    _classCallCheck(this, LoggerPlugin);

    options = options || {};
    this.verbose = options.verbose;
    this.onSuccessMessage = options.onSuccessMessage;
    this.deprecationMessage = options.deprecationMessage;
    this.target = options.target;
  }

  _createClass(LoggerPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('done', function (stats) {
        _newArrowCheck(this, _this);

        var rawMessages = stats.toJson({}, true);
        var messages = (0, _formatWebpackMessages2.default)(rawMessages);
        IS_COMPILING = false;

        if (!messages.errors.length && !messages.warnings.length) {
          if (!IS_DONE) {
            if (!this.verbose) {
              (0, _clearConsole2.default)();
            }
            var time = stats.endTime - stats.startTime;
            _logger2.default.end('Bundle for ' + String(this.target) + ' compiled successfully in ' + time + ' ms');
            IS_DONE = true;

            if (this.onSuccessMessage) {
              _logger2.default.end(this.onSuccessMessage);
            }

            if (this.deprecationMessage) {
              _logger2.default.warn(this.deprecationMessage);
            }
          }
        }

        if (messages.errors.length) {
          messages.errors.forEach(function (e) {
            _newArrowCheck(this, _this);

            _logger2.default.error('Failed to compile ' + String(this.target) + ' with ' + String(messages.errors.length) + ' errors');
            _logger2.default.error(e);
          }.bind(this));
          return;
        }

        if (messages.warnings.length) {
          _logger2.default.warn('Failed to compile with ' + String(messages.warnings.length) + ' warnings');
          messages.warnings.forEach(function (w) {
            _newArrowCheck(this, _this);

            return _logger2.default.info(w);
          }.bind(this));
        }
      }.bind(this));

      compiler.plugin('compile', function (params) {
        _newArrowCheck(this, _this);

        IS_DONE = false;
        if (!IS_COMPILING) {
          if (!this.verbose) {
            (0, _clearConsole2.default)();
          }
          _logger2.default.info('Compiling...');
          IS_COMPILING = true;
        }
      }.bind(this));
    }
  }]);

  return LoggerPlugin;
}();

exports.default = LoggerPlugin;