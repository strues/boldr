'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureLocal = exports.configureJwt = exports.signToken = exports.isAuthenticated = undefined;

var _isAuthenticated = require('./isAuthenticated');

var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

var _signToken = require('./signToken');

var _signToken2 = _interopRequireDefault(_signToken);

var _jwt = require('./providers/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _local = require('./providers/local');

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isAuthenticated = _isAuthenticated2.default;
exports.signToken = _signToken2.default;
exports.configureJwt = _jwt2.default;
exports.configureLocal = _local2.default;