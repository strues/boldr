import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import * as ctrl from './role.controller';

const router = new express.Router();
/**
 * @api {get} /roles       Get a list of all roles
 * @apiName listRoles
 * @apiGroup Role
 * @apiPermission public
 * @apiSuccess {Object[]} roles               List containing the role objects.
 * @apiSuccess {Number}   roles.id            id of the role
 * @apiSuccess {String}   roles.uuid          uuid of the role
 * @apiSuccess {String}   roles.name          name of the role
 * @apiSuccess {String}   roles.image         url for the image associated with the role
 * @apiSuccess {String}   roles.description   description of the role
 * @apiSuccess {Object[]} roles.users         array containing the associated user objects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listRoles);
/**
 * @api {get} /roles/:id       Get information for the specific role
 * @apiName getRole
 * @apiGroup Role
 * @apiPermission public
 * @apiParam {Number}     id            the role id
 * @apiSuccess {Number}   id            id of the role
 * @apiSuccess {String}   uuid          uuid of the role
 * @apiSuccess {String}   name          name of the role
 * @apiSuccess {String}   image         url for the image associated with the role
 * @apiSuccess {String}   description   description of the role
 * @apiSuccess {Object[]} roles.users   array containing the associated user objects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id', ctrl.getRole);

router.get('/:id/users', ctrl.getRoleUsers);
// router.post('/', isAuthenticated, controller.create.bind(controller));
// router.put('/:id', isAuthenticated, controller.update.bind(controller));
// router.patch('/:id', isAuthenticated, controller.update.bind(controller));
// router.delete('/:id', isAuthenticated, controller.destroy.bind(controller));

export default router;
