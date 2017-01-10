'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SALT = exports.randomString = exports.generateHash = undefined;

var _hashing = require('./hashing');

exports.generateHash = _hashing.generateHash;
exports.randomString = _hashing.randomString;
exports.SALT = _hashing.SALT;