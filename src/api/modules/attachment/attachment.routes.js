import express from 'express';
import { BaseController, isAuthenticated } from '../../core';
import * as ctrl from './attachment.controller';
import Attachment from './attachment.model';

const controller = new BaseController(Attachment);

const router = express.Router();

/**
 * @api {get} /attachments       Get all attachment files
 * @apiName getAllAttachment
 * @apiGroup Attachment
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3000/api/v1/attachments
 *
 */
router.get('/', ctrl.listAttachments);
/**
 * @api {get} /attachments/:id  Get a specific file by its id
 * @apiName getAttachment
 * @apiGroup Attachment
 *
 * @apiExample Example usage:
 * curl -i http://localhost:3000/api/v1/attachments/1
 *
 * @apiParam {String}    id   The medias's id.
 *
 * @apiSuccess {String}  id   The Attachment ID
 */
router.get('/:id', ctrl.getAttachment);

/**
 * @api {post} /attachments/dashboard Upload an attachment associating with a dashboard upload
 * @apiName uploadDashboard
 * @apiGroup Attachment
 * @apiPermission user
 */
router.post('/dashboard', isAuthenticated, ctrl.fromDashboard);
router.delete('/:id', ctrl.deleteAttachment);
router.get('/aws/bucket', ctrl.getAllAWS);

export default router;
