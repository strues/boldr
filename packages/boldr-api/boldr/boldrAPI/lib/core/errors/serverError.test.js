'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _serverError = require('./serverError');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('InternalServer', function () {
  var intServ = new _serverError.InternalServer();
  expect(typeof intServ === 'undefined' ? 'undefined' : (0, _typeof3.default)(intServ)).toBe('object');
  expect(intServ.status).toBe(500);
});
it('NotImplemented', function () {
  var notImp = new _serverError.NotImplemented();
  expect(typeof notImp === 'undefined' ? 'undefined' : (0, _typeof3.default)(notImp)).toBe('object');
  expect(notImp.status).toBe(500);
});