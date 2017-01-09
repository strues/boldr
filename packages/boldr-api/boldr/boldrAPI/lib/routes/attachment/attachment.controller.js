'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAttachment = exports.getAttachment = exports.fromDashboard = exports.listAttachments = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var fromDashboard = exports.fromDashboard = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var fileFields, newAttachment;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fileFields = {
              id: (0, _uuid2.default)(),
              url: req.body.url,
              user_id: req.user.id,
              file_name: req.body.file_name,
              original_name: req.body.original_name,
              file_description: req.body.file_description,
              file_type: req.body.file_type,
              s3_key: req.body.s3_key
            };
            _context2.next = 3;
            return _attachment2.default.query().insertAndFetch(fileFields);

          case 3:
            newAttachment = _context2.sent;
            _context2.next = 6;
            return _activity2.default.query().insert({
              id: (0, _uuid2.default)(),
              name: newAttachment.file_name,
              user_id: req.user.id,
              action: 'New upload',
              type: 'create',
              data: { newAttachment: newAttachment },
              entry_uuid: newAttachment.id,
              entry_table: 'attachment'
            });

          case 6:
            return _context2.abrupt('return', (0, _index.responseHandler)(res, 201, newAttachment));

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function fromDashboard(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteAttachment = exports.deleteAttachment = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    var attachment, params;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _attachment2.default.query().findById(req.params.id);

          case 3:
            attachment = _context4.sent;
            params = {
              Bucket: _api2.default.aws.bucket,
              Key: attachment.s3_key
            };

            _s2.default.deleteObject(params, function (err, data) {
              if (err) {
                console.log(err, err.stack);
                return res.status(500).json(err);
              } else {
                console.log(data);
              }
            });
            _context4.next = 8;
            return _attachment2.default.query().deleteById(req.params.id);

          case 8:
            return _context4.abrupt('return', (0, _index.responseHandler)(res, 204, 'Deleted file'));

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return', res.status(500).json(_context4.t0));

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 11]]);
  }));

  return function deleteAttachment(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAllAWS = getAllAWS;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _s = require('../../services/aws/s3');

var _s2 = _interopRequireDefault(_s);

var _index = require('../../core/index');

var _api = require('../../../config/api');

var _api2 = _interopRequireDefault(_api);

var _activity = require('../activity/activity.model');

var _activity2 = _interopRequireDefault(_activity);

var _attachment = require('./attachment.model');

var _attachment2 = _interopRequireDefault(_attachment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('boldrAPI:attachment-controller');

var listAttachments = exports.listAttachments = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var medias;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _attachment2.default.query();

          case 3:
            medias = _context.sent;
            return _context.abrupt('return', (0, _index.responseHandler)(res, 200, medias));

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

  return function listAttachments(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getAttachment = exports.getAttachment = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var media;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _attachment2.default.query().findById(req.params.id);

          case 3:
            media = _context3.sent;
            return _context3.abrupt('return', (0, _index.responseHandler)(res, 200, media));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', res.status(500).json(_context3.t0));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getAttachment(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

function getAllAWS(req, res, next) {
  var params = {
    Bucket: _api2.default.aws.bucket
  };
  _s2.default.listObjectsV2(params, function (err, data) {
    if (err) {
      debug(err, err.stack);
    } else {
      debug(data);
    }
  });
}