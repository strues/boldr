import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { BaseController } from '../../core';
import Link from './link.model';
import * as ctrl from './link.controller';

const controller = new BaseController(Link);

const router = express.Router();
/**
 * @api {get} /links Return a list of all navigation links
 * @apiName getLinks
 * @apiGroup Links
 * @apiPermission public
 */
router.get('/', ctrl.getLinks);
/**
 * @api {post} /links Create a new navigation link
 * @apiName createLink
 * @apiGroup Links
 * @apiUse authHeader
 * @apiPermission admin
 */
router.post('/', isAuthenticated, ctrl.createLink);
/**
 * @api {get} /links/:id Return a specific link by its id.
 * @apiName showLink
 * @apiGroup Links
 * @apiPermission public
 * @apiParam {Number} id The id of the link
 */
router.get('/:id', ctrl.showLink);
/**
 * @api {put} /links/:id Update a link
 * @apiName updateLink
 * @apiGroup Links
 * @apiPermission admin
 * @apiParam {Number} id The id of the link
 */
router.put('/:id', isAuthenticated, ctrl.updateLink);
/**
 * @api {patch} /links/:id Update a link
 * @apiName updateLink
 * @apiGroup Links
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the link
 */
router.patch('/:id', isAuthenticated, ctrl.updateLink);
/**
 * @api {delete} /links/:id Delete a link
 * @apiName destroy
 * @apiGroup Links
 * @apiPermission admin
 * @apiUse authHeader
 * @apiParam {Number} id The id of the link
 */
router.delete('/:id', isAuthenticated, controller.destroy.bind(controller));

export default router;
