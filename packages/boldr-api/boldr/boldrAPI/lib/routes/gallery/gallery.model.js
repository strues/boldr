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

var _BaseModel2 = require('../../core/base/BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gallery = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(Gallery, _BaseModel);

  function Gallery() {
    (0, _classCallCheck3.default)(this, Gallery);
    return (0, _possibleConstructorReturn3.default)(this, (Gallery.__proto__ || (0, _getPrototypeOf2.default)(Gallery)).apply(this, arguments));
  }

  (0, _createClass3.default)(Gallery, null, [{
    key: 'tableName',
    get: function get() {
      return 'gallery';
    }
  }]);
  return Gallery;
}(_BaseModel3.default), _class.addTimestamps = true, _class.addUUID = false, _temp);
exports.default = Gallery;