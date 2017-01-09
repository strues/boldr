'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _redis = require('../../services/redis');

var _redis2 = _interopRequireDefault(_redis);

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisStore = require('connect-redis')(_expressSession2.default); /**
                                                                      * Session Middleware
                                                                      * src/core/middleware/session
                                                                      */

var env = _api2.default.env || 'development';

var sessionMiddleware = (0, _expressSession2.default)({
  store: new RedisStore({ client: _redis2.default }),
  secret: _api2.default.token.secret,
  name: 'boldr:sid',
  proxy: true,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
});

exports.default = sessionMiddleware;