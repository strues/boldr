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

// Related Model


var _objection = require('objection');

var _base = require('../../core/base');

var _menuDetail = require('./detail/menuDetail.model');

var _menuDetail2 = _interopRequireDefault(_menuDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Menu, _BaseModel);

  function Menu() {
    (0, _classCallCheck3.default)(this, Menu);
    return (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).apply(this, arguments));
  }

  (0, _createClass3.default)(Menu, null, [{
    key: 'tableName',
    get: function get() {
      return 'menu';
    }
  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        details: {
          relation: _objection.Model.ManyToManyRelation,
          modelClass: _menuDetail2.default,
          join: {
            from: 'menu.id',
            through: {
              from: 'menu_menu_detail.menu_id',
              to: 'menu_menu_detail.menu_detail_id'
            },
            to: 'menu_detail.id'
          }
        }
      };
    }
  }]);
  return Menu;
}(_base.BaseModel), _class.addTimestamps = false, _class.addUUID = true, _temp);
exports.default = Menu;