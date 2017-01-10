'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSetting = exports.getSetting = exports.listSettings = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var listSettings = exports.listSettings = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var settings;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _setting2.default.query();

          case 3:
            settings = _context.sent;

            if (settings) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(404).json({ message: 'Unable to find any settings. Theres a problem.' }));

          case 6:
            return _context.abrupt('return', (0, _core.responseHandler)(res, 200, settings));

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

  return function listSettings(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getSetting = exports.getSetting = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var setting;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _setting2.default.query().findById(req.params.id);

          case 3:
            setting = _context2.sent;

            if (setting) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', res.status(404).json({ error: 'Unable to find a setting matching the id' }));

          case 6:
            return _context2.abrupt('return', (0, _core.responseHandler)(res, 200, setting));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.status(500).json(_context2.t0));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 9]]);
  }));

  return function getSetting(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var addSetting = exports.addSetting = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var settingPayload, setting;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            settingPayload = {
              key: req.body.key,
              value: req.body.value,
              description: req.body.description
            };
            _context3.next = 4;
            return _setting2.default.query().insert(settingPayload);

          case 4:
            setting = _context3.sent;
            return _context3.abrupt('return', (0, _core.responseHandler)(res, 201, setting));

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

  return function addSetting(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateSetting = updateSetting;

var _core = require('../../core');

var _setting = require('./setting.model');

var _setting2 = _interopRequireDefault(_setting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:settings-controller');

function updateSetting(req, res) {
  debug(req.body);
  return _setting2.default.query().patchAndFetchById(req.params.id, req.body).then(function (setting) {
    return (0, _core.responseHandler)(res, 202, setting);
  });
}