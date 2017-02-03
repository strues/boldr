import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import * as ctrl from './user.controller';

const router = express.Router();
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
 * @apiName adminCreateUser
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
router.post('/', isAuthenticated, checkRole('Admin'), ctrl.adminCreateUser);

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
router.put('/:id', isAuthenticated, ctrl.updateUser);
router.put('/admin/:id', isAuthenticated, checkRole('Admin'), ctrl.adminUpdateUser);
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
router.patch('/:id', isAuthenticated, ctrl.updateUser);

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
router.delete('/:id', isAuthenticated, checkRole('Admin'), ctrl.destroyUser);

export default router;
