import { Router } from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import { wrapRouter } from '../../utils/asyncRouter';
import * as ctrl from './media.controller';

/**
 * @apiDefine Attachment
 *
 */

const router = wrapRouter(new Router());

/**
 * @api {get} /media              List all media
 * @apiName ListMedia
 * @apiGroup Media
 *
 * @apiExample Example usage:
 * curl -i https://staging.boldr.io/api/v1/media
 *
 * @apiSuccess    {Object[]}    media           List of media.
 * @apiSuccess    {String}      id                    The media's id (uuid)
 * @apiSuccess    {String}      fileName             The media's name
 * @apiSuccess    {String}      safeName      Slugified / normalized fileName
 * @apiSuccess    {String}      fileDescription  A caption describing the media
 * @apiSuccess    {String}      fileType         The mime type
 * @apiSuccess    {String}      url        The url where the file is located
 * @apiSuccess    {String}      path   The the path on the server of the media
 * @apiSuccess    {String}      remoteUrl  Url for a remotely hosted media file
 * @apiSuccess    {Date}        createdAt            The upload date
 * @apiSuccess    {Date}        updatedAt   When the media was modified.
 */
router.get('/', ctrl.listMedia);

/**
 * @api {get} /media/:id    Get specific media
 * @apiName GetMedia
 * @apiGroup Media
 *
 * @apiExample Example usage:
 * curl -i https://staging.boldr.io/api/v1/media/1
 *
 * @apiParam {String}    id   The media's id (uuid)
 *
 * @apiSuccess {String}  id   The Media id (uuid)
 */
router.get('/:id', ctrl.getMedia);

/**
 * @api {post} /media         Upload media
 * @apiName UploadMedia
 * @apiGroup Media
 * @apiPermission user
 */
router.post('/', isAuthenticated, ctrl.uploadMedia);

/**
 * @api {post} /media/remote         Upload from a remote resource
 * @apiName UploadFromUrl
 * @apiGroup Media
 * @apiPermission user
 */
router.post('/remote', isAuthenticated, ctrl.uploadFromUrl);

/**
 * @api {delete} /media/:id  Delete media
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiUse authHeader
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Invalid credentials.
 * @apiError 403 Forbidden
 */
router.delete('/:id', isAuthenticated, checkRole('Admin'), ctrl.deleteMedia);
/**
 * @api {put} /media/:id      Update media
 * @apiName UpdateMedia
 * @apiGroup Media
 * @apiUse authHeader
 * @apiPermission admin
 * @apiSuccess (Success 202) 202
 * @apiError 401 Invalid credentials.
 * @apiError 403 Forbidden
 */
router.put('/:id', isAuthenticated, checkRole('Admin'), ctrl.updateMedia);
export default router;
