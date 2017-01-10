'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDetail = exports.showDetail = exports.updateDetail = exports.getDetails = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getDetails = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var links;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _menuDetail2.default.query();

          case 3:
            links = _context.sent;

            if (links) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(404).json({ message: 'Unable to find any links. Try creating one.' }));

          case 6:
            return _context.abrupt('return', (0, _index.responseHandler)(res, 200, links));

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

  return function getDetails(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var showDetail = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var navigation;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _menuDetail2.default.query().findById(req.params.id);

          case 2:
            navigation = _context2.sent;
            return _context2.abrupt('return', (0, _index.responseHandler)(res, 200, navigation));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function showDetail(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var createDetail = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var payload, newLink, menuId, existingMenu, associateMenuDetail;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            payload = {
              name: req.body.name,
              link: req.body.link,
              icon: req.body.icon,
              label: (0, _slugIt2.default)(req.body.name),
              attribute: req.body.attribute,
              position: req.body.position,
              uuid: (0, _uuid2.default)()
            };
            _context3.next = 4;
            return _menuDetail2.default.query().insert(payload);

          case 4:
            newLink = _context3.sent;
            menuId = req.body.menu_id || 1;
            _context3.next = 8;
            return _menu2.default.query().where('id', menuId).first();

          case 8:
            existingMenu = _context3.sent;

            if (existingMenu) {
              _context3.next = 11;
              break;
            }

            throw new _index.InternalServer();

          case 11:
            debug(existingMenu, 'existing menu found');
            _context3.next = 14;
            return _joinMenuDetail2.default.query().insert({
              menu_id: existingMenu.id,
              menu_detail_id: newLink.id
            });

          case 14:
            associateMenuDetail = _context3.sent;

            debug(associateMenuDetail);
            // await Activity.query().insert({
            //   id: uuid(),
            //   name: payload.name,
            //   label: newLink.label,
            //   user_id: req.user.id,
            //   action: 'New link',
            //   type: 'create',
            //   data: { payload },
            //   entry_uuid: newLink.uuid,
            //   entry_table: 'link',
            // });

            return _context3.abrupt('return', (0, _index.responseHandler)(res, 201, newLink));

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', res.status(500).json(_context3.t0));

          case 22:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 19]]);
  }));

  return function createDetail(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _slugIt = require('../../../utils/slugIt');

var _slugIt2 = _interopRequireDefault(_slugIt);

var _index = require('../../../core/index');

var _activity = require('../../activity/activity.model');

var _activity2 = _interopRequireDefault(_activity);

var _menu = require('../menu.model');

var _menu2 = _interopRequireDefault(_menu);

var _joinMenuDetail = require('../joinMenuDetail.model');

var _joinMenuDetail2 = _interopRequireDefault(_joinMenuDetail);

var _menuDetail = require('./menuDetail.model');

var _menuDetail2 = _interopRequireDefault(_menuDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:menuDetail-controller');

function updateDetail(req, res) {
  return _menuDetail2.default.query().patchAndFetchById(req.params.id, req.body).then(function (navigation) {
    return (0, _index.responseHandler)(res, 202, navigation);
  });
}

exports.getDetails = getDetails;
exports.updateDetail = updateDetail;
exports.showDetail = showDetail;
exports.createDetail = createDetail;