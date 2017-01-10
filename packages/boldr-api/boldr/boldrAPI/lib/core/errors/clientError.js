'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserNotVerifiedError = exports.Conflict = exports.MethodNotAllowed = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = undefined;

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
 * @class BadRequest
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */
var BadRequest = function (_HttpError) {
  (0, _inherits3.default)(BadRequest, _HttpError);

  function BadRequest(message) {
    (0, _classCallCheck3.default)(this, BadRequest);
    return (0, _possibleConstructorReturn3.default)(this, (BadRequest.__proto__ || (0, _getPrototypeOf2.default)(BadRequest)).call(this, message || 'The request could not be understood by the server due to malformed syntax.', 'BadRequest', 400));
  }

  return BadRequest;
}(_httpError2.default);

/**
 * @class Unauthorized
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */


var Unauthorized = function (_HttpError2) {
  (0, _inherits3.default)(Unauthorized, _HttpError2);

  function Unauthorized(message) {
    (0, _classCallCheck3.default)(this, Unauthorized);
    return (0, _possibleConstructorReturn3.default)(this, (Unauthorized.__proto__ || (0, _getPrototypeOf2.default)(Unauthorized)).call(this, message || 'The request requires user authentication. Please try again with the\n    correct authorization header', 'Unauthorized', 401));
  }

  return Unauthorized;
}(_httpError2.default);

/**
 * @class Forbidden
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */


var Forbidden = function (_HttpError3) {
  (0, _inherits3.default)(Forbidden, _HttpError3);

  function Forbidden() {
    (0, _classCallCheck3.default)(this, Forbidden);
    return (0, _possibleConstructorReturn3.default)(this, (Forbidden.__proto__ || (0, _getPrototypeOf2.default)(Forbidden)).call(this, 'Insufficient access rights.', 'Forbidden', 403));
  }

  return Forbidden;
}(_httpError2.default);

/**
 * @class NotFound
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */


var NotFound = function (_HttpError4) {
  (0, _inherits3.default)(NotFound, _HttpError4);

  function NotFound() {
    (0, _classCallCheck3.default)(this, NotFound);
    return (0, _possibleConstructorReturn3.default)(this, (NotFound.__proto__ || (0, _getPrototypeOf2.default)(NotFound)).call(this, 'The server monkeys misplaced the resource you requested. Check for misspellings and\n    try the request again..', 'NotFound', 404));
  }

  return NotFound;
}(_httpError2.default);

/**
 * @class MethodNotAllowed
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */


var MethodNotAllowed = function (_HttpError5) {
  (0, _inherits3.default)(MethodNotAllowed, _HttpError5);

  function MethodNotAllowed() {
    (0, _classCallCheck3.default)(this, MethodNotAllowed);
    return (0, _possibleConstructorReturn3.default)(this, (MethodNotAllowed.__proto__ || (0, _getPrototypeOf2.default)(MethodNotAllowed)).call(this, 'The method received in the request-line is known by the origin server but\n    not supported by the target resource.', 'MethodNotAllowed', 405));
  }

  return MethodNotAllowed;
}(_httpError2.default);

/**
 * @class Conflict
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */


var Conflict = function (_HttpError6) {
  (0, _inherits3.default)(Conflict, _HttpError6);

  function Conflict() {
    (0, _classCallCheck3.default)(this, Conflict);
    return (0, _possibleConstructorReturn3.default)(this, (Conflict.__proto__ || (0, _getPrototypeOf2.default)(Conflict)).call(this, 'The request could not be completed due to a conflict with the current state\n    of the target resource.', 'Conflict', 409));
  }

  return Conflict;
}(_httpError2.default);
/**
 * @class UserNotVerifiedError
 * @param {string} message the error message.
 * @param {string} name the name of the error
 * @param {number} code the error code.
 */


var UserNotVerifiedError = function (_HttpError7) {
  (0, _inherits3.default)(UserNotVerifiedError, _HttpError7);

  function UserNotVerifiedError() {
    (0, _classCallCheck3.default)(this, UserNotVerifiedError);
    return (0, _possibleConstructorReturn3.default)(this, (UserNotVerifiedError.__proto__ || (0, _getPrototypeOf2.default)(UserNotVerifiedError)).call(this, 'This account has not been confirmed. Please check your email for a verification link.', 'UserNotVerifiedError', 401));
  }

  return UserNotVerifiedError;
}(_httpError2.default);

exports.BadRequest = BadRequest;
exports.Unauthorized = Unauthorized;
exports.Forbidden = Forbidden;
exports.NotFound = NotFound;
exports.MethodNotAllowed = MethodNotAllowed;
exports.Conflict = Conflict;
exports.UserNotVerifiedError = UserNotVerifiedError;