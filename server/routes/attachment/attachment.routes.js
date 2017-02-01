import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import * as ctrl from './attachment.controller';

const router = express.Router();

/**
 * @api {get} /attachments    Get all attachment entries from the database.
 * @apiName GetAllAttachments
 * @apiGroup Attachment
 *
 * @apiExample Example usage:
 * curl -i https://staging.boldr.io/api/v1/attachments
 *
 * @apiSuccess    {Object[]}    attachments           List of attachments.
 * @apiSuccess    {String}      id                    The attachments's id (uuid)
 * @apiSuccess    {String}      file_name             The attachment's name
 * @apiSuccess    {String}      original_name         The attachment's name prior to uploading.
 * @apiSuccess    {String}      file_description      A caption describing the attachment
 * @apiSuccess    {String}      file_type             The mime type
 * @apiSuccess    {String}      url                   The url where the file is located
 * @apiSuccess    {String}      s3_key                AWS S3 key
 * @apiSuccess    {String}      safe_name             The file name that is non-editable by the user.
 * @apiSuccess    {Date}        created_at            The upload date
 * @apiSuccess    {Date}        updated_at            When the attachment was modified.
 */
router.get('/', ctrl.listAttachments);

/**
 * @api {post} /attachments  Upload an attachment
 * @apiName UploadAttachment
 * @apiGroup Attachment
 * @apiPermission user
 */
router.post('/', isAuthenticated, ctrl.uploadAttachment);
/**
 * @api {get} /attachments/:id  Get a specific file by its id
 * @apiName GetAttachment
 * @apiGroup Attachment
 *
 * @apiExample Example usage:
 * curl -i https://staging.boldr.io/api/v1/attachments/1
 *
 * @apiParam {String}    id   The medias's id.
 *
 * @apiSuccess {String}  id   The Attachment ID
 */
router.get('/:id', ctrl.getAttachment);

/**
 * @api {delete} /attachments/:id  Remove attachment from database and S3
 * @apiName DeleteAttachment
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
 * @apiName UpdateAttachment
 * @apiGroup Attachment
 * @apiUse authHeader
 * @apiPermission admin
 * @apiSuccess (Success 202) 202
 * @apiError 401 Invalid credentials.
 * @apiError 403 Forbidden
 */
router.put('/:id', isAuthenticated, checkRole('Admin'), ctrl.updateAttachment);

export default router;
