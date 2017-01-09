'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _index = require('../../core/index');

var _attachment = require('./attachment.controller');

var ctrl = _interopRequireWildcard(_attachment);

var _attachment2 = require('./attachment.model');

var _attachment3 = _interopRequireDefault(_attachment2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _index.BaseController(_attachment3.default);

var router = _express2.default.Router();

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
router.post('/dashboard', _authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.fromDashboard);
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
router.delete('/:id', _authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.deleteAttachment);
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

exports.default = router;