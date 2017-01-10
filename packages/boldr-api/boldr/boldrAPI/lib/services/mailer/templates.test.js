'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _templates = require('./templates');

var tpl = _interopRequireWildcard(_templates);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('welcomeEmail -- should generate an email message', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var verificationToken, welcome;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          verificationToken = 'test';
          _context.next = 3;
          return tpl.welcomeEmail(verificationToken);

        case 3:
          welcome = _context.sent;


          expect(typeof welcome === 'undefined' ? 'undefined' : (0, _typeof3.default)(welcome)).toBe('string');

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it('forgotPasswordEmail -- should generate an email message', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var verificationToken, msg;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          verificationToken = 'test';
          _context2.next = 3;
          return tpl.forgotPasswordEmail(verificationToken);

        case 3:
          msg = _context2.sent;


          expect(typeof msg === 'undefined' ? 'undefined' : (0, _typeof3.default)(msg)).toBe('string');

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

it('passwordModifiedEmail -- should generate an email message', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
  var user, mod;
  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = 'test';
          _context3.next = 3;
          return tpl.passwordModifiedEmail(user);

        case 3:
          mod = _context3.sent;


          expect(typeof mod === 'undefined' ? 'undefined' : (0, _typeof3.default)(mod)).toBe('string');

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));