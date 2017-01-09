'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpError = exports.UserNotVerifiedError = exports.NotImplemented = exports.InternalServer = exports.Conflict = exports.MethodNotAllowed = exports.NotFound = exports.Forbidden = exports.Unauthorized = exports.BadRequest = undefined;

var _clientError = require('./clientError');

var _serverError = require('./serverError');

var _httpError = require('./httpError');

var _httpError2 = _interopRequireDefault(_httpError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BadRequest = _clientError.BadRequest;
exports.Unauthorized = _clientError.Unauthorized;
exports.Forbidden = _clientError.Forbidden;
exports.NotFound = _clientError.NotFound;
exports.MethodNotAllowed = _clientError.MethodNotAllowed;
exports.Conflict = _clientError.Conflict;
exports.InternalServer = _serverError.InternalServer;
exports.NotImplemented = _serverError.NotImplemented;
exports.UserNotVerifiedError = _clientError.UserNotVerifiedError;
exports.HttpError = _httpError2.default;