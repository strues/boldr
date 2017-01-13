import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole, BaseController } from '../../core/index';
import { processQuery } from '../../utils/index';
import * as ctrl from './post.controller';
import Post from './post.model';

const controller = new BaseController(Post, 'post_id');
const router = express.Router({ mergeParams: true });

router.route('/')
      /**
       * @api {get} /posts Retrieve all posts
       * @apiName listPosts
       * @apiGroup Post
       * @apiPermission public
       * @apiUse listParams
       * @apiSuccess {Object[]} posts List of posts.
       * @apiSuccess {String}  posts.uuid             The UUID of the post
       * @apiSuccess {String}s  posts.title            The title of the post
       * @apiSuccess {String}  posts.excerpt          A short description or snippet of the post
       * @apiSuccess {String}  posts.content          The content of the post
       * @apiSuccess {String}  posts.feature_image    The URL for an image to use with the post
       * @apiSuccess {String}  posts.tags             Comma separated tags for the post
       * @apiSuccess {String}  posts.status           One of: draft / published / archived
       * @apiSuccess {Object[]} posts.tags            Array containing the related tags
       * @apiSuccess {Object}   posts.author          The post author's user object
       * @apiError {Object} 400 Some parameters may contain invalid values.
       */
      .get(processQuery, controller.index.bind(controller))
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
      .post(isAuthenticated, checkRole('Admin'), ctrl.createPost);

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
      .post(isAuthenticated, checkRole('Admin'), ctrl.addTag)
      /**
       * @api {put} /posts/pid/:id Update a post by its id
       * @apiName update
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
      .put(isAuthenticated, checkRole('Admin'), ctrl.update)
      /**
       * @api {delete} /posts/pid/:id Remove a post by its id
       * @apiName destroy
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
      .delete(isAuthenticated, checkRole('Admin'), ctrl.destroy);

export default router;
