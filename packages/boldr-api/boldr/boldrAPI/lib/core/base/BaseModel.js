'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /* eslint-disable id-match */


var _objection = require('objection');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class BaseModel
 * @extends Model
 */
var BaseModel = (_temp = _class = function (_Model) {
  (0, _inherits3.default)(BaseModel, _Model);

  function BaseModel() {
    (0, _classCallCheck3.default)(this, BaseModel);
    return (0, _possibleConstructorReturn3.default)(this, (BaseModel.__proto__ || (0, _getPrototypeOf2.default)(BaseModel)).apply(this, arguments));
  }

  (0, _createClass3.default)(BaseModel, [{
    key: '$beforeInsert',


    /**
     * Ran before inserting into the database.
     */

    /**
     * An object of attribute names with function values to transform attributes on the model if they exist.
     *
     * @type {object}
     */

    /**
     * If we should update the created_at attribute when inserted and the updated_at attribute when updated.
     *
     * @type {boolean}
     */
    value: function $beforeInsert() {
      if (this.constructor.addTimestamps) {
        this.created_at = new Date().toJSON();
      }
      if (this.constructor.addUUID) {
        this.uuid = (0, _uuid2.default)();
      }
    }

    /**
     * Ran before updating the database.
     */


    /**
     * An array of attribute names that will be excluded from being returned.
     *
     * @type {array}
     */

    // Adds a uuid field to the model for cases where the primary key is NOT a uuid type

  }, {
    key: '$beforeUpdate',
    value: function $beforeUpdate() {
      if (this.constructor.timestamps) {
        this.updated_at = new Date().toJSON();
      }
    }

    /**
     * Ran after querying the database and transforming to the Model.
     *
     * @param {object} json
     * @returns {object}
     */

  }, {
    key: '$parseDatabaseJson',
    value: function $parseDatabaseJson(json) {
      var _this2 = this;

      json = (0, _get3.default)(BaseModel.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseModel.prototype), '$parseDatabaseJson', this).call(this, json);

      (0, _keys2.default)(this.constructor.transforms).forEach(function (key) {
        if (json.hasOwnProperty(key)) {
          json[key] = _this2.constructor.transforms[key](json[key]);
        }
      });

      this.constructor.hidden.forEach(function (hidden) {
        if (json.hasOwnProperty(hidden)) {
          delete json[hidden];
        }
      });

      return json;
    }
  }]);
  return BaseModel;
}(_objection.Model), _class.addTimestamps = true, _class.addUUID = true, _class.transforms = {}, _class.hidden = [], _temp);
exports.default = BaseModel;