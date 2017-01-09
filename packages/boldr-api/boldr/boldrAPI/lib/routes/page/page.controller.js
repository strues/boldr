'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPage = exports.getPageByUrl = exports.listPages = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var listPages = exports.listPages = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var pages;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _page2.default.query();

          case 3:
            pages = _context.sent;
            return _context.abrupt('return', res.status(200).json(pages));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', res.status(500).json(_context.t0));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function listPages(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getPageByUrl = exports.getPageByUrl = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var page;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _page2.default.query().where({ url: req.params.url }).first();

          case 3:
            page = _context2.sent;
            return _context2.abrupt('return', res.status(200).json(page));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.status(500).json(_context2.t0));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function getPageByUrl(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var createPage = exports.createPage = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var payload, newPage;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            payload = {
              id: (0, _uuid2.default)(),
              name: req.body.name,
              label: (0, _slugIt2.default)(req.body.name),
              url: req.body.url,
              layout: req.body.layout
            };
            _context3.next = 4;
            return _page2.default.query().insert(payload);

          case 4:
            newPage = _context3.sent;
            return _context3.abrupt('return', responseHandler(res, 201, newPage));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', res.status(500).json(_context3.t0));

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 8]]);
  }));

  return function createPage(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _slugIt = require('../../utils/slugIt');

var _slugIt2 = _interopRequireDefault(_slugIt);

var _page = require('./page.model');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }