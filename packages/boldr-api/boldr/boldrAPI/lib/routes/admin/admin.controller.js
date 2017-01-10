'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllStats = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getAllStats = exports.getAllStats = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var postStats, tagStats, userStats, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _post2.default.query().count();

          case 3:
            postStats = _context.sent;
            _context.next = 6;
            return _tag2.default.query().count();

          case 6:
            tagStats = _context.sent;
            _context.next = 9;
            return _user2.default.query().count();

          case 9:
            userStats = _context.sent;
            payload = {
              posts: parseInt(postStats[0].count, 10),
              tags: parseInt(tagStats[0].count, 10),
              users: parseInt(userStats[0].count, 10)
            };
            return _context.abrupt('return', (0, _index.responseHandler)(res, 200, payload));

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', next(new _index.BadRequest()));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  return function getAllStats(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _index = require('../../core/index');

var _tag = require('../tag/tag.model');

var _tag2 = _interopRequireDefault(_tag);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _post = require('../post/post.model');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }