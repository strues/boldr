'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _core = require('../../core');

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('./user.controller');

var ctrl = _interopRequireWildcard(_user3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _core.BaseController(_user2.default);

var router = new _express2.default.Router();
/**
 * @api {get} /users Retrieve all users
 * @apiName listUsers
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/', ctrl.listUsers);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName getUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id', ctrl.getUser);

/**
 * @api {post} /users Create user
 * @apiName createUser
 * @apiGroup User
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String} email User's email address.
 * @apiParam {String} password User's password.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 409 Email already registered.
 */
router.post('/', _authentication.isAuthenticated, (0, _core.checkRole)('Admin'), controller.create.bind(controller));

/**
 * @api {put} /users/:id Update user
 * @apiName updateUser
 * @apiGroup User
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [password] User's password.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id', _authentication.isAuthenticated, ctrl.updateUser);
router.put('/admin/:id', _authentication.isAuthenticated, (0, _core.checkRole)('Admin'), ctrl.adminUpdateUser);
/**
 * @api {patch} /users/:id Update user
 * @apiName updateUser
 * @apiGroup User
 * @apiPermission user
 * @apiUse authHeader
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [password] User's password.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.patch('/:id', _authentication.isAuthenticated, ctrl.updateUser);

/**
 * @api {delete} /users/:id Delete user
 * @apiName destroyUser
 * @apiGroup User
 * @apiPermission admin
 * @apiUse authHeader
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id', _authentication.isAuthenticated, (0, _core.checkRole)('Admin'), ctrl.destroyUser);

exports.default = router;