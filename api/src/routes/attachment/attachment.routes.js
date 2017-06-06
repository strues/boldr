import { Router } from 'express';
import { isAuthenticated } from '../../services/authentication';
import { wrapRouter } from '../../utils/asyncRouter';
import { checkRole } from '../../middleware/rbac';
import * as ctrl from './attachment.controller';

const router = wrapRouter(new Router());

/**
 * @api {get} /attachments              List all attachments
 * @apiName GetAllAttachments
 * @apiGroup Attachment
 *
 * @apiExample Example usage:
 * curl -i https://staging.boldr.io/api/v1/attachments
 *
 * @apiSuccess    {Object[]}    attachments           List of attachments.
 * @apiSuccess    {String}      id                    The attachments's id (uuid)
 * @apiSuccess    {String}      fileName             The attachment's name
 * @apiSuccess    {String}      safeName             Slugified / normalized fileName
 * @apiSuccess    {String}      fileDescription      A caption describing the attachment
 * @apiSuccess    {String}      fileType             The mime type
 * @apiSuccess    {String}      url                   The url where the file is located
 * @apiSuccess    {Date}        createdAt            The upload date
 * @apiSuccess    {Date}        updatedAt            When the attachment was modified.
 */
router.get('/', ctrl.listAttachments);

/**
 * @api {post} /attachments         Upload attachment
 * @apiName UploadAttachment
 * @apiGroup Attachment
 * @apiPermission user
 */
router.post('/', isAuthenticated, ctrl.uploadAttachment);
/**
 * @api {get} /attachments/:id    Get specific attachment
 * @apiName GetAttachment
 * @apiGroup Attachment
 *
 * @apiExample Example usage:
 * curl -i https://staging.boldr.io/api/v1/attachments/1
 *
 * @apiParam {String}    id   The attachment's id (uuid)
 *
 * @apiSuccess {String}  id   The Attachment id (uuid)
 */
router.get('/:id', ctrl.getAttachment);

/**
 * @api {delete} /attachments/:id  Delete attachment
 * @apiName DeleteAttachment
 * @apiGroup Attachment
 * @apiUse authHeader
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Invalid credentials.
 * @apiError 403 Forbidden
 */
router.delete(
  '/:id',
  isAuthenticated,
  checkRole('Admin'),
  ctrl.deleteAttachment,
);
/**
 * @api {put} /attachments/:id      Update attachment
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
