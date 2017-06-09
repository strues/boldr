'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('boldr-utils/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug3.default)('boldr:dx:services:listener');

var ServerListener = function () {
  function ServerListener(listener, name) {
    var _this = this;

    _classCallCheck(this, ServerListener);

    this.name = name || 'listener';
    this.lastConnectionKey = 0;
    this.connectionMap = {};
    this.listener = listener;

    // Track all connections to our server so that we can close them when needed.
    this.listener.on('connection', function (connection) {
      _newArrowCheck(this, _this);

      // Increment the connection key.
      this.lastConnectionKey += 1;

      // Generate a new key to represent the connection
      var connectionKey = this.lastConnectionKey;

      // Add the connection to our map.
      this.connectionMap[connectionKey] = connection;

      // Remove the connection from our map when it closes.
      connection.on('close', function () {
        _newArrowCheck(this, _this);

        delete this.connectionMap[connectionKey];
      }.bind(this));
    }.bind(this));
  }

  _createClass(ServerListener, [{
    key: 'killAllConnections',
    value: function killAllConnections() {
      var _this2 = this;

      Object.keys(this.connectionMap).forEach(function (connectionKey) {
        _newArrowCheck(this, _this2);

        this.connectionMap[connectionKey].destroy();
      }.bind(this));
    }
  }, {
    key: 'shutdown',
    value: function shutdown() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _newArrowCheck(this, _this3);

        if (this.listener) {
          this.killAllConnections();

          _logger2.default.task('Destroyed all existing connections.');

          this.listener.close(function () {
            _newArrowCheck(this, _this3);

            _logger2.default.task('Closed listener.');
            resolve();
          }.bind(this));
        } else {
          resolve();
        }
      }.bind(this));
    }
  }]);

  return ServerListener;
}();

exports.default = ServerListener;