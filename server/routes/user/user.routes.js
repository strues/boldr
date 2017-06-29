import { Router } from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import { wrapRouter } from '../../utils/asyncRouter';
import User from '../../models/User';
import * as ctrl from './user.controller';

const router = wrapRouter(new Router());

/**
 * @api {get} /users/:id     Get user
 * @apiName getUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiUse NotFoundError
 */
router.get('/:id', ctrl.getUser);

/**
 * @api {post} /users       Create user
 * @apiName adminCreateUser
 * @apiGroup User
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String} email User's email address.
 * @apiParam {String} password User's password.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiUse MissingUserFields
 * @apiUse UnauthorizedError
 * @apiError 409 Email already registered.
 */
router.post('/', isAuthenticated, checkRole('Admin'), ctrl.adminCreateUser);

/**
 * @api {put} /users/:id      Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiUse authHeader
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [password] User's password.
 * @apiSuccess {Object} user User's data.
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
router.put('/:id', isAuthenticated, ctrl.updateUser);

/**
 * @api {put} /users/admin/:id      Admin update user
 * @apiName AdminUpdateUser
 * @apiGroup User
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [password] User's password.
 * @apiSuccess {Object} user User's data.
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
router.put(
  '/admin/:id',
  isAuthenticated,
  checkRole('Admin'),
  ctrl.adminUpdateUser,
);
/**
 * @api {patch} /users/:id        Update user
 * @apiName ModifyUser
 * @apiGroup User
 * @apiPermission user
 * @apiUse authHeader
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [password] User's password.
 * @apiSuccess {Object} user User's data.
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
router.patch('/:id', isAuthenticated, ctrl.updateUser);

/**
 * @api {delete} /users/:id       Delete user
 * @apiName DestroyUser
 * @apiGroup User
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {String} id    The id of the user to be deleted
 * @apiSuccess (Success 204) 204 No Content.
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
router.delete('/:id', isAuthenticated, checkRole('Admin'), ctrl.destroyUser);

/**
 * @api {get} /users/:username/profile     Get user profile
 * @apiName GetProfile
 * @apiGroup User
 * @apiPermission public
 * @apiParam {String} username  Username of the profile owner.
 * @apiSuccess {Object} user    User's data.
 * @apiUse NotFoundError
 */
router.get('/:username/profile', ctrl.getUsername);

export default router;
