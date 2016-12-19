import express from 'express';
import { isAuthenticated } from 'services/authentication';
import { BaseController } from 'core/base';
import { processQuery } from 'utils/index';

// Model
import Gallery from './gallery.model';

const controller = new BaseController(Gallery);

const router = new express.Router();

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', isAuthenticated, controller.create.bind(controller));
router.put('/:id', isAuthenticated, controller.update.bind(controller));
router.patch('/:id', isAuthenticated, controller.update.bind(controller));
router.delete('/:id', isAuthenticated, controller.destroy.bind(controller));

export default router;
