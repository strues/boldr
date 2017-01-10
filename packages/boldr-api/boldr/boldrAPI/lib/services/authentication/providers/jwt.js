'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = configureJwt;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _api = require('../../../../config/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var jwtOptions = {
  secretOrKey: _api2.default.token.secret,
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter('access_token'), ExtractJwt.fromBodyField('access_token'), ExtractJwt.fromAuthHeaderWithScheme('Bearer')])
};

function configureJwt(User) {
  var _this = this;

  _passport2.default.use(new JwtStrategy(jwtOptions, function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(payload, done) {
      var NOW, user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              NOW = new Date().getTime();

              if (!(payload.exp < NOW)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', done(null, false));

            case 3:
              _context.next = 5;
              return User.query().findById(payload.sub).first();

            case 5:
              user = _context.sent;

              if (user) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', done(null, false, { message: 'This email is not registered.' }));

            case 10:
              return _context.abrupt('return', done(null, user));

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));
}