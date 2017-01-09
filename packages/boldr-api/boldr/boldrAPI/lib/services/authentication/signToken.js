'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signToken(user) {
  var roleinfo = user.roles[0].name;
  var timestamp = new Date().getTime();
  var payload = {
    sub: user.id,
    iat: timestamp,
    expiresIn: 60 * 60 * 24,
    email: user.email,
    role: roleinfo
  };
  return _jsonwebtoken2.default.sign(payload, _api2.default.token.secret);
}

exports.default = signToken;