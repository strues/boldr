import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { BaseController } from '../../core';
import { processQuery } from '../../utils';
import * as ctrl from './block.controller';
import Block from './block.model';

const controller = new BaseController(Block);

const router = new express.Router();
/**
 * @api {get} /blocks       Get all blocks
 * @apiName listBlocks
 * @apiGroup Blocks
 * @apiPermission public
 * @apiSuccess {Object[]} blocks        List of blocks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listBlocks);

/**
 * @api {get} /blocks/:id       Get a specific by its id.
 * @apiName showBlocks
 * @apiGroup Blocks
 * @apiPermission public
 * @apiSuccess (Success 200) {Object} The requested block
 */
router.get('/:id', controller.show.bind(controller));
router.post('/', isAuthenticated, ctrl.createBlock);
router.put('/:id', controller.update.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

export default router;
