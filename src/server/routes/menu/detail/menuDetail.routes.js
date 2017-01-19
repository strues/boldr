import express from 'express';
import { isAuthenticated } from '../../../services/authentication';
import MenuDetail from './menuDetail.model';
import * as ctrl from './menuDetail.controller';

const router = express.Router();
/**
 * @api {get} /menu-details Return a list of all menu details
 * @apiName getDetails
 * @apiGroup MenuDetails
 * @apiPermission public
 */
router.get('/', ctrl.getDetails);
/**
 * @api {post} /menu-details Create a new menu detail
 * @apiName createDetail
 * @apiGroup MenuDetails
 * @apiUse authHeader
 * @apiPermission admin
 */
router.post('/', isAuthenticated, ctrl.createDetail);
/**
 * @api {get} /menu-details/:id Return a specific menu detail by its id.
 * @apiName showDetail
 * @apiGroup MenuDetails
 * @apiPermission public
 * @apiParam {Number} id The id of the detail
 */
router.get('/:id', ctrl.showDetail);
/**
 * @api {put} /menu-details/:id Update a menu detail
 * @apiName updateDetail
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiParam {Number} id The id of the detail
 */
router.put('/:id', isAuthenticated, ctrl.updateDetail);
/**
 * @api {patch} /menu-details/:id Update a menu detail
 * @apiName updateDetail
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the detail
 */
router.patch('/:id', isAuthenticated, ctrl.updateDetail);
/**
 * @api {delete} /menu-details/:id Delete a detail
 * @apiName destroy
 * @apiGroup MenuDetails
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the detail
 */
// router.delete('/:id', isAuthenticated, controller.destroy.bind(controller));

export default router;
