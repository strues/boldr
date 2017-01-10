'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _activity = require('./activity/activity.routes');

var _activity2 = _interopRequireDefault(_activity);

var _admin = require('./admin/admin.routes');

var _admin2 = _interopRequireDefault(_admin);

var _attachment = require('./attachment/attachment.routes');

var _attachment2 = _interopRequireDefault(_attachment);

var _auth = require('./auth/auth.routes');

var _auth2 = _interopRequireDefault(_auth);

var _block = require('./block/block.routes');

var _block2 = _interopRequireDefault(_block);

var _gallery = require('./gallery/gallery.routes');

var _gallery2 = _interopRequireDefault(_gallery);

var _menuDetail = require('./menu/detail/menuDetail.routes');

var _menuDetail2 = _interopRequireDefault(_menuDetail);

var _menu = require('./menu/menu.routes');

var _menu2 = _interopRequireDefault(_menu);

var _page = require('./page/page.routes');

var _page2 = _interopRequireDefault(_page);

var _post = require('./post/post.routes');

var _post2 = _interopRequireDefault(_post);

var _role = require('./role/role.routes');

var _role2 = _interopRequireDefault(_role);

var _s = require('./s3/s3.routes');

var _s2 = _interopRequireDefault(_s);

var _setting = require('./setting/setting.routes');

var _setting2 = _interopRequireDefault(_setting);

var _tag = require('./tag/tag.routes');

var _tag2 = _interopRequireDefault(_tag);

var _token = require('./token/token.routes');

var _token2 = _interopRequireDefault(_token);

var _user = require('./user/user.routes');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @apiDefine listParams
 * @apiParam {String[]} include=[author,tags] Return associated models with the request
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 */

/**
 * @apiDefine authHeader
 * @apiHeader {String}  Authorization   The user's token
 * @apiHeaderExample {json} Authorization Header Example:
 *    {
 *      "Authorization": "Bearer JSONWEBTOKEN"
 *    }
 */

/**
 * @apiDefine admin Admin access only
 * You must pass an authorization header with a token associated with an admin user
 * to access this endpoint.
 */

/**
 * @apiDefine user User access for certain restricted routes.
 * You must pass an authorization header with a token to access this endpoint.
 */
router.get('/health-check', function (req, res) {
  return res.status(200).json('OK, it works');
});

router.use('/activities', _activity2.default);
router.use('/admin', _admin2.default);
router.use('/attachments', _attachment2.default);
router.use('/auth', _auth2.default);
router.use('/blocks', _block2.default);
router.use('/galleries', _gallery2.default);
router.use('/menu-details', _menuDetail2.default);
router.use('/menus', _menu2.default);
router.use('/pages', _page2.default);
router.use('/posts', _post2.default);
router.use('/roles', _role2.default);
router.use('/s3', (0, _s2.default)({
  headers: { 'Access-Control-Allow-Origin': '*' }, // optional
  ACL: 'public-read' }));
router.use('/settings', _setting2.default);
router.use('/tags', _tag2.default);
router.use('/tokens', _token2.default);
router.use('/users', _user2.default);

exports.default = router;