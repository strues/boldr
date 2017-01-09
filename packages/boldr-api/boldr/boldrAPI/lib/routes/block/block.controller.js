'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBlock = exports.listBlocks = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var listBlocks = exports.listBlocks = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var blocks;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _block2.default.query();

          case 3:
            blocks = _context.sent;

            if (blocks) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(404).json({ message: 'Unable to find any block data.' }));

          case 6:
            return _context.abrupt('return', (0, _index.responseHandler)(res, 200, blocks));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', res.status(500).json(_context.t0));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  return function listBlocks(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var createBlock = exports.createBlock = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var elem, newBlock;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            elem = req.body.element;
            _context2.next = 4;
            return _block2.default.query().insert({
              id: (0, _uuid2.default)(),
              name: (0, _slugIt2.default)(req.body.name),
              element: elem.toLowerCase(),
              content: req.body.content
            });

          case 4:
            newBlock = _context2.sent;

            if (newBlock) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', res.status(400).json({ message: 'Unable to create a new block object.' }));

          case 7:
            _context2.next = 9;
            return _activity2.default.query().insert({
              id: (0, _uuid2.default)(),
              name: (0, _slugIt2.default)(newBlock.name),
              user_id: req.user.id,
              action: 'New block',
              type: 'create',
              data: { newBlock: newBlock },
              entry_uuid: newBlock.id,
              entry_table: 'block'
            });

          case 9:
            return _context2.abrupt('return', (0, _index.responseHandler)(res, 201, newBlock));

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.status(500).json(_context2.t0));

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 12]]);
  }));

  return function createBlock(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _slugIt = require('../../utils/slugIt');

var _slugIt2 = _interopRequireDefault(_slugIt);

var _index = require('../../core/index');

var _activity = require('../activity/activity.model');

var _activity2 = _interopRequireDefault(_activity);

var _block = require('./block.model');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:block-controller');