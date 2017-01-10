'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _signToken = require('./signToken');

var _signToken2 = _interopRequireDefault(_signToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = {
  id: '2c062e26-df71-48ce-b363-4ae9b966e7a0',
  email: 'fake@email.com',
  roles: [{
    id: 1,
    uuid: '3d062e26-df71-48ce-b363-4ae9b966e7a0',
    name: 'User'
  }]
};

it('creates a signed jsonwebtoken', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var token;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _signToken2.default)(user);

        case 2:
          token = _context.sent;

          expect(typeof token === 'undefined' ? 'undefined' : (0, _typeof3.default)(token)).toBe('string');

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));