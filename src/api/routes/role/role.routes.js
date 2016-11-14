import express from 'express';
import { BaseController, isAuthenticated } from '../../core';

import { processQuery } from '../../utils';
import Role from './role.model';

const controller = new BaseController(Role);

const router = new express.Router();
/**
 * @api {get} /settings       Get all settings objects
 * @apiName listSettings
 * @apiGroup Settings
 * @apiPermission public
 * @apiUse listParams
 * @apiSuccess {Object[]} roles List of roles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', processQuery, controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

export default router;
