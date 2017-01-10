'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

var _logger = require('../../core/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

var redisClient = _redis2.default.createClient(_api2.default.redis.url);

redisClient.on('connect', function () {
  _logger2.default.info('Redis connection has been established!');
});

redisClient.on('error', function (err) {
  _logger2.default.error('Error while connecting to Redis!!! ' + err);
  process.exit(1);
});

redisClient.on('close', function () {
  _logger2.default.warn('Redis connection has been closed.');
  process.exit(1);
});

redisClient.on('reconnecting', function () {
  _logger2.default.info('Redis is attempting to re-connect');
});

redisClient.on('+node', function (data) {
  _logger2.default.info(data, 'node is connected');
});

exports.default = redisClient;