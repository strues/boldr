import express from 'express';
import { BaseController } from '../../core';
import { processQuery } from '../../utils';
import Block from './block.model';

const controller = new BaseController(Block);

const router = new express.Router();
/**
 * @api {get} /blocks       Get all blocks
 * @apiName Index
 * @apiGroup Blocks
 * @apiPermission public
 * @apiSuccess {Object[]} roles List of blocks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', processQuery, controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

export default router;
