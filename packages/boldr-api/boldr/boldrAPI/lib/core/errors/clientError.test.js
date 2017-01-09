'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _clientError = require('./clientError');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('BadRequest', function () {
  var badReq = new _clientError.BadRequest();
  expect(typeof badReq === 'undefined' ? 'undefined' : (0, _typeof3.default)(badReq)).toBe('object');
  expect(badReq.message).toBe('The request could not be understood by the server due to malformed syntax.');
});

it('Unauthorized', function () {
  var unAuth = new _clientError.Unauthorized();
  expect(typeof unAuth === 'undefined' ? 'undefined' : (0, _typeof3.default)(unAuth)).toBe('object');
  expect(unAuth.status).toBe(401);
});
it('Forbidden', function () {
  var forb = new _clientError.Forbidden();
  expect(typeof forb === 'undefined' ? 'undefined' : (0, _typeof3.default)(forb)).toBe('object');
  expect(forb.status).toBe(403);
});
it('NotFound', function () {
  var nf = new _clientError.NotFound();
  expect(typeof nf === 'undefined' ? 'undefined' : (0, _typeof3.default)(nf)).toBe('object');
  expect(nf.status).toBe(404);
});
it('MethodNotAllowed', function () {
  var notallow = new _clientError.MethodNotAllowed();
  expect(typeof notallow === 'undefined' ? 'undefined' : (0, _typeof3.default)(notallow)).toBe('object');
  expect(notallow.status).toBe(405);
});
it('Conflict', function () {
  var confl = new _clientError.Conflict();
  expect(typeof confl === 'undefined' ? 'undefined' : (0, _typeof3.default)(confl)).toBe('object');
  expect(confl.status).toBe(409);
});
it('UserNotVerifiedError', function () {
  var verifErr = new _clientError.UserNotVerifiedError();
  expect(typeof verifErr === 'undefined' ? 'undefined' : (0, _typeof3.default)(verifErr)).toBe('object');
  expect(verifErr.message).toBe('This account has not been confirmed. Please check your email for a verification link.');
});