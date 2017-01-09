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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /* eslint-disable id-match */ /* eslint-disable no-unused-vars */

// Related Models


var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _objection = require('objection');

var _BaseModel2 = require('../../core/base/BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _role = require('../role/role.model');

var _role2 = _interopRequireDefault(_role);

var _attachment = require('../attachment/attachment.model');

var _attachment2 = _interopRequireDefault(_attachment);

var _token = require('../token/token.model');

var _token2 = _interopRequireDefault(_token);

var _post = require('../post/post.model');

var _post2 = _interopRequireDefault(_post);

var _userRole = require('./userRole.model');

var _userRole2 = _interopRequireDefault(_userRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('boldrAPI:user-model');

var User = (_temp = _class = function (_BaseModel) {
  (0, _inherits3.default)(User, _BaseModel);

  function User() {
    (0, _classCallCheck3.default)(this, User);
    return (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).apply(this, arguments));
  }

  (0, _createClass3.default)(User, [{
    key: 'stripPassword',
    value: function stripPassword() {
      delete this['password']; // eslint-disable-line
      return this;
    }
    /**
     * Before inserting make sure we hash the password if provided.
     *
     * @param {object} queryContext
     */

  }, {
    key: '$beforeInsert',
    value: function $beforeInsert(queryContext) {
      (0, _get3.default)(User.prototype.__proto__ || (0, _getPrototypeOf2.default)(User.prototype), '$beforeInsert', this).call(this, queryContext);

      if (this.hasOwnProperty('password')) {
        this.password = _bcryptjs2.default.hashSync(this.password, 10);
      }
      if (this.firstName) this.firstName = this.firstName.trim();
      if (this.lastName) this.lastName = this.lastName.trim();
      this.email = this.email.trim();
    }

    /**
     * authenticate is specific to the user instance. compares the hashed password
     * with the password from the request.
     * @param plainText
     * @returns {*}
     */

  }, {
    key: 'authenticate',
    value: function authenticate(plainText) {
      return _bcryptjs2.default.compareSync(plainText, this.password);
    }
    /**
     * Before updating make sure we hash the password if provided.
     *
     * @param {object} queryContext
     */

  }, {
    key: '$beforeUpdate',
    value: function $beforeUpdate(queryContext) {
      (0, _get3.default)(User.prototype.__proto__ || (0, _getPrototypeOf2.default)(User.prototype), '$beforeUpdate', this).call(this, queryContext);

      if (this.hasOwnProperty('password')) {
        this.password = _bcryptjs2.default.hashSync(this.password, 10);
      }
    }
    /**
     * Checks to see if this user has the provided role or not.
     *
     * @param {string} role
     * @returns {boolean}
     */

  }, {
    key: 'hasRole',
    value: function hasRole(role) {
      if (!this.roles) {
        return false;
      }

      var validRoles = this.roles.filter(function (_ref) {
        var name = _ref.name;
        return name === role;
      });

      return validRoles.length;
    }
  }], [{
    key: 'tableName',
    get: function get() {
      return 'user';
    }
    /**
     * An array of attribute names that will be excluded from being returned.
     *
     * @type {array}
     */

  }, {
    key: 'relationMappings',
    get: function get() {
      return {
        roles: {
          relation: _objection.Model.ManyToManyRelation,
          modelClass: _role2.default,
          join: {
            from: 'user.id',
            through: {
              from: 'user_role.user_id',
              to: 'user_role.role_id'
            },
            to: 'role.id'
          }
        },
        posts: {
          relation: _objection.Model.HasManyRelation,
          modelClass: _post2.default,
          join: {
            from: 'user.id',
            to: 'post.user_id'
          }
        },
        uploads: {
          relation: _objection.Model.HasManyRelation,
          modelClass: _attachment2.default,
          join: {
            from: 'user.id',
            to: 'attachment.user_id'
          }
        },
        tokens: {
          relation: _objection.Model.HasOneRelation,
          modelClass: _token2.default,
          join: {
            from: 'user.id',
            to: 'token.user_id'
          }
        }
      };
    }
  }]);
  return User;
}(_BaseModel3.default), _class.addTimestamps = true, _class.addUUID = false, _class.hidden = [], _temp);
exports.default = User;