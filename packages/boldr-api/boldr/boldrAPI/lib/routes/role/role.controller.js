'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listRoles = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _index = require('../../core/index');

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _role = require('./role.model');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listRoles = exports.listRoles = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var roles;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _role2.default.query().eager('users').omit(_user2.default, ['password']);

          case 3:
            roles = _context.sent;
            return _context.abrupt('return', (0, _index.responseHandler)(res, 200, roles));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', res.status(500).json(_context.t0));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function listRoles(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();