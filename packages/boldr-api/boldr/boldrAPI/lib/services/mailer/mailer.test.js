'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mailer = require('./mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('Mailer -- should generate a random token', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var user, mailBody, mailSubject, mailing;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = { email: 'test@test.com' };
          mailBody = 'abc';
          mailSubject = 'test';
          _context.next = 5;
          return (0, _mailer2.default)(user, mailBody, mailSubject);

        case 5:
          mailing = _context.sent;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));