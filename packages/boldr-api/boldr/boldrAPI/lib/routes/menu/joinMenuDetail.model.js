'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _objection = require('objection');

var _menuDetail = require('./detail/menuDetail.model');

var _menuDetail2 = _interopRequireDefault(_menuDetail);

var _menu = require('./menu.model');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuMenuDetail = (_temp = _class = function (_Model) {
  (0, _inherits3.default)(MenuMenuDetail, _Model);

  function MenuMenuDetail() {
    (0, _classCallCheck3.default)(this, MenuMenuDetail);
    return (0, _possibleConstructorReturn3.default)(this, (MenuMenuDetail.__proto__ || (0, _getPrototypeOf2.default)(MenuMenuDetail)).apply(this, arguments));
  }

  (0, _createClass3.default)(MenuMenuDetail, null, [{
    key: 'tableName',
    get: function get() {
      return 'menu_menu_detail';
    }
  }, {
    key: 'idColumn',
    get: function get() {
      return ['menu_id', 'menu_detail_id'];
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        detail: {
          relation: _objection.Model.BelongsToOneRelation,
          modelClass: _menuDetail2.default,
          join: {
            from: 'menu_menu_detail.menu_detail_id',
            to: 'menu_detail.id'
          }
        },
        menu: {
          relation: _objection.Model.BelongsToOneRelation,
          modelClass: _menu2.default,
          join: {
            from: 'menu_menu_detail.menu_id',
            to: 'menu.id'
          }
        }
      };
    }
  }]);
  return MenuMenuDetail;
}(_objection.Model), _class.addTimestamps = false, _class.addUUID = false, _temp);
exports.default = MenuMenuDetail;