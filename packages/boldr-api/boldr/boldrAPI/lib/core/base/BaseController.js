'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var isValidData = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, additionalProperties) {
    var data, props;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = additionalProperties.filter(function (value) {
              return value.checkExistence;
            });
            _context.prev = 1;
            _context.next = 4;
            return _promise2.default.map(data, function (item) {
              return item.model.query().findById(Number(req.params[item.prop]));
            });

          case 4:
            props = _context.sent;

            if (!props.some(function (item) {
              return item === undefined || item === null;
            })) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', false);

          case 7:
            return _context.abrupt('return', true);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](1);
            return _context.abrupt('return', new Error('Error in looking up resources'));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 10]]);
  }));

  return function isValidData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _objectionFind = require('objection-find');

var _objectionFind2 = _interopRequireDefault(_objectionFind);

var _index = require('../../utils/index');

var _responseHandler = require('../response/responseHandler');

var _responseHandler2 = _interopRequireDefault(_responseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParameterFilters(req, filterProperties) {
  var paramFilter = void 0;
  if (filterProperties) {
    paramFilter = {};
    filterProperties.forEach(function (item) {
      paramFilter[item.prop] = Number(req.params[item.prop]);
    });
  }
  return paramFilter;
}

function getAdditionalProperties(req, data) {
  var additionalProperties = {};
  data.filter(function (item) {
    return item.include;
  }).forEach(function (item) {
    additionalProperties[item.prop] = Number(req.params[item.prop]);
  });
  return additionalProperties;
}
/* istanbul ignore */

var BaseController = function () {
  function BaseController(model, id, data) {
    (0, _classCallCheck3.default)(this, BaseController);

    this.model = model;
    this.id = id;
    if (data) {
      this.additionalProperties = data.additionalProperties;
      this.userField = data.userField;
      this.filterEager = data.filterEager;
    }
  }

  (0, _createClass3.default)(BaseController, [{
    key: 'create',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
        var data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = req.body;

                if (!this.additionalProperties) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 4;
                return isValidData(req, this.additionalProperties);

              case 4:
                if (!_context2.sent) {
                  _context2.next = 8;
                  break;
                }

                data = (0, _assign2.default)({}, data, getAdditionalProperties(req, this.additionalProperties));
                _context2.next = 9;
                break;

              case 8:
                return _context2.abrupt('return', (0, _index.throwNotFound)(res));

              case 9:

                if (this.userField) {
                  if (req.user) {
                    data[this.userField] = req.user.id;
                  }
                }

                return _context2.abrupt('return', this.model.query().insert(data).then(function (item) {
                  return (0, _responseHandler2.default)(res, 201, item);
                }).catch(function (err) {
                  return res.status(500).json(err);
                }));

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'update',
    value: function update(req, res) {
      return this.model.query().patchAndFetchById(req.params[this.id], req.body).then(function (item) {
        return (0, _responseHandler2.default)(res, 200, item);
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: 'index',
    value: function index(req, res, next) {
      var query = (0, _objectionFind2.default)(this.model).build(req.query.where).skipUndefined().where(getParameterFilters(req, this.additionalProperties)).eager(req.query.include).orderBy(req.query.sort.by, req.query.sort.order).page(req.query.page.number, req.query.page.size);

      if (this.filterEager) {
        this.filterEager.reduce(function (memo, data) {
          return query.filterEager(data.relation, (0, _index.filterEagerData)(req.query, data.table, data.property));
        }, query);
      }

      query.then(function (items) {
        return (0, _responseHandler2.default)(res, 200, items);
      }).catch(function (err) {
        return next(err);
      });
    }
  }, {
    key: 'show',
    value: function show(req, res) {
      return this.model.query().skipUndefined().findById(req.params[this.id]).where(getParameterFilters(req, this.additionalProperties)).eager(req.query.eager).then(function (item) {
        if (!item) return (0, _index.throwNotFound)(res);
        return (0, _responseHandler2.default)(res, 200, item);
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(req, res) {
      return this.model.query().deleteById(req.params[this.id]).then(function () {
        return (0, _responseHandler2.default)(res, 204);
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    }
  }]);
  return BaseController;
}();

exports.default = BaseController;