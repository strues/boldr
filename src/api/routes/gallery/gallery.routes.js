import express from 'express';
import { BaseController } from '../../core';
import { processQuery } from '../../utils';
import Gallery from './gallery.model';

const controller = new BaseController(Gallery);

const router = new express.Router();

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

export default router;
