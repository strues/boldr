'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slugIt = require('./slugIt');

var _slugIt2 = _interopRequireDefault(_slugIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('replace whitespace', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          expect((0, _slugIt2.default)('hey hi hello')).toBe('hey-hi-hello');
          expect((0, _slugIt2.default)('hey hi hello', '_')).toBe('hey_hi_hello');

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

it('removes disallowed characters', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          expect((0, _slugIt2.default)('hey, hi hello')).toBe('hey-hi-hello');
          expect((0, _slugIt2.default)('hey- hi hello')).toBe('hey-hi-hello');
          expect((0, _slugIt2.default)('hey] hi hello')).toBe('hey-hi-hello');

        case 3:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

it('removes whitespaces', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          expect((0, _slugIt2.default)(' hey hi hello ')).toBe('hey-hi-hello');

        case 1:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));