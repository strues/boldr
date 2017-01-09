'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _hashing = require('./hashing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('generateVerifyCode() - should generate a random token', function () {
  var token = (0, _hashing.generateHash)();
  expect(typeof token === 'undefined' ? 'undefined' : (0, _typeof3.default)(token)).toBe('object');
});