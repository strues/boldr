import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './role.controller';

const router = express.Router();
/**
 * @api {get} /roles       List all roles
 * @apiName ListRoles
 * @apiGroup Role
 * @apiPermission public
 * @apiSuccess {Object[]} roles               List containing the role objects.
 * @apiSuccess {Number}   roles.id            id of the role
 * @apiSuccess {String}   roles.name          name of the role
 * @apiSuccess {String}   roles.image         url for the image associated with the role
 * @apiSuccess {String}   roles.description   description of the role
 * @apiSuccess {Object[]} roles.users         array containing the associated user objects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listRoles);
/**
 * @api {get} /roles/:id       Get specific role
 * @apiName GetRole
 * @apiGroup Role
 * @apiPermission public
 * @apiParam {Number}     id            the role id
 * @apiSuccess {Number}   id            id of the role
 * @apiSuccess {String}   name          name of the role
 * @apiSuccess {String}   image         url for the image associated with the role
 * @apiSuccess {String}   description   description of the role
 * @apiSuccess {Object[]} roles.users   array containing the associated user objects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id', ctrl.getRole);
/**
 * @api {get} /roles/:id/users      Get users for role
 * @apiName GetRoleUsers
 * @apiGroup Role
 * @apiPermission public
 * @apiParam {Number}     id            the role id
 * @apiSuccess {Number}   id            id of the role
 * @apiSuccess {String}   name          name of the role
 * @apiSuccess {String}   image         url for the image associated with the role
 * @apiSuccess {String}   description   description of the role
 * @apiSuccess {Object[]} roles.users   array containing the associated user objects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id/users', ctrl.getRoleUsers);

export default router;
