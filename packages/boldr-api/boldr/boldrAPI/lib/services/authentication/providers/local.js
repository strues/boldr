'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = configureLocal;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureLocal(User) {
  var _this = this;

  _passport2.default.use(new _passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(email, password, done) {
      var user, validAuth;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return User.query().where({ email: email }).eager('[roles]').first();

            case 2:
              user = _context.sent;

              if (user) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', done(null, false, { message: 'This email is not registered.' }));

            case 5:
              _context.next = 7;
              return user.authenticate(password);

            case 7:
              validAuth = _context.sent;

              if (validAuth) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', done(null, false, { message: 'This password is not correct.' }));

            case 12:
              return _context.abrupt('return', done(null, user));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));
}