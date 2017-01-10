'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class HttpError
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code of error.
 * @param {boolean} isPublic - Whether the message should be visible to user or not.
 */
var HttpError = function (_Error) {
  (0, _inherits3.default)(HttpError, _Error);

  function HttpError(message, type, status) {
    (0, _classCallCheck3.default)(this, HttpError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HttpError.__proto__ || (0, _getPrototypeOf2.default)(HttpError)).call(this, message));

    _this.name = _this.constructor.name;
    _this.type = type;
    _this.status = status;
    // this.stack = this.constructor.stack;
    // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(_this, _this.constructor);
    _this.isOperational = true;

    // Still no message present?
    if (!_this.message) {
      _this.message = 'Unknown error';
    }
    return _this;
  }

  (0, _createClass3.default)(HttpError, [{
    key: 'getHttpStatus',
    value: function getHttpStatus() {
      return this.status;
    }
  }]);
  return HttpError;
}(Error);

exports.default = HttpError;