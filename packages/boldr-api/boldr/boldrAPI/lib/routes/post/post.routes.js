'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authentication = require('../../services/authentication');

var _index = require('../../core/index');

var _index2 = require('../../utils/index');

var _post = require('./post.controller');

var ctrl = _interopRequireWildcard(_post);

var _post2 = require('./post.model');

var _post3 = _interopRequireDefault(_post2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _index.BaseController(_post3.default, 'post_id');
var router = _express2.default.Router();

router.route('/')
/**
 * @api {get} /posts Retrieve all posts
 * @apiName listPosts
 * @apiGroup Post
 * @apiPermission public
 * @apiUse listParams
 * @apiSuccess {Object[]} posts List of posts.
 * @apiSuccess {String}  posts.uuid             The UUID of the post
 * @apiSuccess {String}  posts.title            The title of the post
 * @apiSuccess {String}  posts.excerpt          A short description or snippet of the post
 * @apiSuccess {String}  posts.content          The content of the post
 * @apiSuccess {String}  posts.feature_image    The URL for an image to use with the post
 * @apiSuccess {String}  posts.tags             Comma separated tags for the post
 * @apiSuccess {String}  posts.status           One of: draft / published / archived
 * @apiSuccess {Object[]} posts.tags            Array containing the related tags
 * @apiSuccess {Object}   posts.author          The post author's user object
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
.get(_index2.processQuery, controller.index.bind(controller))
/**
 * @api {post} /posts Create a new post
 * @apiName createPost
 * @apiGroup Post
 * @apiPermission user
 * @apiUse authHeader
 *
 * @apiParam {String}  title            The title of the post
 * @apiParam {String}  excerpt          A short description or snippet of the post
 * @apiParam {String}  content          The content of the post
 * @apiParam {String}  feature_image    The URL for an image to use with the post
 * @apiParam {String}  tags             Comma separated tags for the post
 * @apiParam {String}  status           One of: draft / published / archived
  * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 409 There is already a post with this slug. Slugs (titles) must be unique.
 * @apiError {Object} 401 Unauthorized. You must be logged in to create a post.
 */
.post(_authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.createPost);

router.route('/slug/:slug')
/**
 * @api {get} /posts/slug/:slug Retrieve a post by its slug.
 * @apiName getSlug
 * @apiGroup Post
 * @apiPermission public
 * @apiParam {String}     slug             The slug of the post
  * @apiSuccess {String}   uuid             The UUID of the post
 * @apiSuccess {String}   title            The title of the post
 * @apiSuccess {String}   excerpt          A short description or snippet of the post
 * @apiSuccess {String}   content          The content of the post
 * @apiSuccess {String}   feature_image    The URL for an image to use with the post
 * @apiSuccess {String}   tags             Comma separated tags for the post
 * @apiSuccess {String}   status           One of: draft / published / archived
 * @apiSuccess {Object[]} tags             Array containing the related tags
 * @apiSuccess {Object}   author           The post author's user object
 * @apiError {Object} 404 Unable to find a post matching the slug.
 */
.get(ctrl.getSlug);

router.route('/pid/:id')
/**
 * @api {get} /posts/pid/:id Retrieve a post by its id.
 * @apiName getId
 * @apiGroup Post
 * @apiPermission public
  * @apiError {Object} 404 Unable to find a post matching the id.
 */
.get(ctrl.getId)
/**
 * @api {post} /posts/pid/:id Add a tag to the post
 * @apiName addTag
 * @apiGroup Post
 * @apiPermission admin
  * @apiError {Object} 404 Unable to find a post matching the id.
 */
.post(_authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.addTag)
/**
 * @api {put} /posts/pid/:id Update a post by its id
 * @apiName update
 * @apiGroup Post
 * @apiPermission admin
  * @apiError {Object} 404 Unable to find a post matching the id.
 */
.put(_authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.update)
/**
 * @api {delete} /posts/pid/:id Remove a post by its id
 * @apiName destroy
 * @apiGroup Post
 * @apiPermission admin
  * @apiError {Object} 404 Unable to find a post matching the id.
 */
.delete(_authentication.isAuthenticated, (0, _index.checkRole)('Admin'), ctrl.destroy);

exports.default = router;