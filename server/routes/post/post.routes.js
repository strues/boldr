import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import { checkRole } from '../../middleware/rbac';
import redisClient from '../../services/redis';
import * as ctrl from './post.controller';

const cache = require('express-redis-cache')({ client: redisClient });

const router = express.Router();

router.route('/')
      /**
       * @api {get} /posts      List all posts
       * @apiName ListPosts
       * @apiGroup Post
       * @apiPermission public
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
       * @apiError   {Object} 400 Some parameters may contain invalid values.
       */
      .get(ctrl.listPosts)
      /**
       * @api {post} /posts         Create post
       * @apiName CreatePost
       * @apiGroup Post
       * @apiPermission admin
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
       * @api {get} /posts/slug/:slug     Get post by slug
       * @apiName GetSlug
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
       * @api {get} /posts/pid/:id      Get post by id
       * @apiName GetId
       * @apiGroup Post
       * @apiPermission public

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
      .get(ctrl.getId)
      /**
       * @api {post} /posts/pid/:id Add a tag to the post
       * @apiName AddTag
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
      .post(isAuthenticated, checkRole('Admin'), ctrl.addTag)
      /**
       * @api {put} /posts/pid/:id          Update post by id
       * @apiName UpdatePost
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
      .put(isAuthenticated, checkRole('Admin'), ctrl.update)
      /**
       * @api {delete} /posts/pid/:id       Delete post by id
       * @apiName DestroyPost
       * @apiGroup Post
       * @apiPermission admin

       * @apiError {Object} 404 Unable to find a post matching the id.
       */
      .delete(isAuthenticated, checkRole('Admin'), ctrl.destroy);

export default router;
