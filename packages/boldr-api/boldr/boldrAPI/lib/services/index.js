'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureLocal = exports.configureJwt = exports.signToken = exports.isAuthenticated = exports.s3 = exports.mailer = exports.knex = exports.redisClient = undefined;

var _redis = require('./redis');

var _redis2 = _interopRequireDefault(_redis);

var _postgres = require('./postgres');

var _postgres2 = _interopRequireDefault(_postgres);

var _mailer = require('./mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _aws = require('./aws');

var _aws2 = _interopRequireDefault(_aws);

var _authentication = require('./authentication');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.redisClient = _redis2.default;
exports.knex = _postgres2.default;
exports.mailer = _mailer2.default;
exports.s3 = _aws2.default;
exports.isAuthenticated = _authentication.isAuthenticated;
exports.signToken = _authentication.signToken;
exports.configureJwt = _authentication.configureJwt;
exports.configureLocal = _authentication.configureLocal;