import express from 'express';
import { BaseController, isAuthenticated } from '../../core';
import Navigation from './navigation.model';
import * as ctrl from './navigation.controller';

const controller = new BaseController(Navigation);

const router = express.Router();
/**
 * @api {get} /navigations Return a list of all navigation blocks
 * @apiName listNavigation
 * @apiGroup Navigation
 * @apiPermission public
 */
router.get('/', ctrl.listNavigation);

/**
 * @api {post} /navigations Create a new navigation
 * @apiName create
 * @apiGroup Navigation
 * @apiPermission admin
 */
router.post('/', controller.create.bind(controller));

/**
 * @api {get} /navigations/:id Return a specific navigation by its id.
 * @apiName showNavigation
 * @apiGroup Navigation
 * @apiPermission public
 * @apiParam {Number} id The id of the navigation
 */
router.get('/:id', ctrl.showNavigation);
/**
 * @api {put} /navigations/:id Update a navigation
 * @apiName updateNavigation
 * @apiGroup Navigation
 * @apiPermission admin
 * @apiParam {Number} id The id of the link
 */
router.put('/:id', ctrl.updateNavigation);

/**
 * @api {patch} /navigations/:id Update a navigation
 * @apiName updateNavigation
 * @apiGroup Navigation
 * @apiPermission admin
 * @apiParam {Number} id The id of the link
 */
router.patch('/:id', ctrl.updateNavigation);

/**
 * @api {delete} /navigations/:id Delete a navigation
 * @apiName destroy
 * @apiGroup Navigation
 * @apiPermission admin
 * @apiParam {Number} id The id of the navigation
 */
router.delete('/:id', controller.destroy.bind(controller));

export default router;
