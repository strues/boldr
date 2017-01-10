import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole, BaseController } from '../../core/index';
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
router.post('/dashboard', isAuthenticated, checkRole('Admin'), ctrl.fromDashboard);
/**
 * @api {delete} /attachments/:id  Remove attachment from database and S3
 * @apiName deleteAttachment
 * @apiGroup Attachment
 * @apiUse authHeader
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Invalid credentials.
 * @apiError 403 Forbidden
 */
router.delete('/:id', isAuthenticated, checkRole('Admin'), ctrl.deleteAttachment);
/**
 * @api {put} /attachments/:id  Updates an attachment in the database
 * @apiName updateAttachment
 * @apiGroup Attachment
 * @apiUse authHeader
 * @apiPermission admin
 * @apiSuccess (Success 202) 202
 * @apiError 401 Invalid credentials.
 * @apiError 403 Forbidden
 */
router.put('/:id', isAuthenticated, checkRole('Admin'), ctrl.updateAttachment);
/**
 * @api {get} /attachments/aws/bucket  Returns all items in S3 bucket.
 * @apiName getAllAWS
 * @apiGroup Attachment
 * @apiUse authHeader
 * @apiPermission admin
 * @apiSuccess (Success 200) [Object{}]
 * @apiError 401 Invalid credentials.
 * @apiError 403 Forbidden
 */
router.get('/aws/bucket', ctrl.getAllAWS);


export default router;
