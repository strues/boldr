'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotImplemented = exports.InternalServer = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _httpError = require('./httpError');

var _httpError2 = _interopRequireDefault(_httpError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class InternalServer
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
var InternalServer = function (_HttpError) {
  (0, _inherits3.default)(InternalServer, _HttpError);

  function InternalServer() {
    (0, _classCallCheck3.default)(this, InternalServer);
    return (0, _possibleConstructorReturn3.default)(this, (InternalServer.__proto__ || (0, _getPrototypeOf2.default)(InternalServer)).call(this, 'The server encountered an unexpected condition which prevented it\n    from fulfilling the request.', 'InternalServer', 500));
  }

  return InternalServer;
}(_httpError2.default);

/**
 * @class NotImplemented
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */


var NotImplemented = function (_HttpError2) {
  (0, _inherits3.default)(NotImplemented, _HttpError2);

  function NotImplemented() {
    (0, _classCallCheck3.default)(this, NotImplemented);
    return (0, _possibleConstructorReturn3.default)(this, (NotImplemented.__proto__ || (0, _getPrototypeOf2.default)(NotImplemented)).call(this, 'The server does not support the functionality required to fulfill the request.', 'NotImplemented', 500));
  }

  return NotImplemented;
}(_httpError2.default);

exports.InternalServer = InternalServer;
exports.NotImplemented = NotImplemented;