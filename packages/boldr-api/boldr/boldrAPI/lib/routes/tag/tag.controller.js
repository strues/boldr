'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTaggedPostsByName = exports.getTaggedPosts = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getTaggedPosts = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var tags;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _tag2.default.query().findById(req.params.id).eager('[posts]').first();

          case 2:
            tags = _context.sent;
            return _context.abrupt('return', (0, _core.responseHandler)(res, 200, tags));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTaggedPosts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getTaggedPostsByName = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var tags;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _tag2.default.query().where({ name: req.params.name }).eager('[posts]').first();

          case 2:
            tags = _context2.sent;

            debug(tags);
            return _context2.abrupt('return', (0, _core.responseHandler)(res, 200, tags));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getTaggedPostsByName(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _core = require('../../core');

var _tag = require('./tag.model');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldr:post-controller');

exports.getTaggedPosts = getTaggedPosts;
exports.getTaggedPostsByName = getTaggedPostsByName;