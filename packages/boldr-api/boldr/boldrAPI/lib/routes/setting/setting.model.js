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

var _index = require('../../core/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Setting = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Setting, _BaseModel);

  function Setting() {
    (0, _classCallCheck3.default)(this, Setting);
    return (0, _possibleConstructorReturn3.default)(this, (Setting.__proto__ || (0, _getPrototypeOf2.default)(Setting)).apply(this, arguments));
  }

  (0, _createClass3.default)(Setting, null, [{
    key: 'tableName',
    get: function get() {
      return 'setting';
    }
  }]);
  return Setting;
}(_index.BaseModel), _class.addTimestamps = false, _class.addUUID = true, _temp);
exports.default = Setting;