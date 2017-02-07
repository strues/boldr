import uuid from 'uuid';
import * as objection from 'objection';
import { responseHandler, Conflict, BadRequest } from '../../core/index';
import slugIt from '../../utils/slugIt';

// Models
import { Tag, Activity, ActionType, Post, PostTag } from '../../models';

const debug = require('debug')('boldr:post-ctrl');

export async function listPosts(req, res, next) {
  try {
    const allPosts = await Post.query().eager('[tags,author]').skipUndefined();
    return responseHandler(res, 200, allPosts);
  } catch (err) {
    /* istanbul ignore next */
    return next(new BadRequest(err));
  }
}

export async function createPost(req, res, next) {
  req.assert('title', 'A title must be provided').notEmpty();
  req.assert('content', 'Content can not be empty').notEmpty();
  req.sanitize('title').trim();

  const errors = req.validationErrors();

  if (errors) return res.status(400).send(errors);
  const postSlug = slugIt(req.body.title);
  // look for a matching slug in the database
  const existingPost = await Post.query().where('slug', postSlug).first();
  if (existingPost) return res.status(409).json('A post with this title already exists.');

  if (!req.body.tags) return res.status(400).json('You must submit at least one tag.');

  async function createPostTagRelation(existingTag, newPost) {
    await PostTag.query().insert({ tag_id: existingTag.id, post_id: newPost.id });
  }

  try {
    const newPost = await objection.transaction(Post, async Post => {
      // create the post
      const createPost = await Post
      .query()
      .insert({
        title: req.body.title,
        slug: postSlug,
        excerpt: req.body.excerpt,
        content: req.body.content,
        feature_image: req.body.feature_image,
        background_image: req.body.background_image,
        meta: req.body.meta,
        attachments: req.body.attachments,
        published: req.body.published,
        user_id: req.user.id,
      });
      // relate the author to post
      await createPost.$relatedQuery('author').relate({ id: req.user.id });

      const reqTags = req.body.tags;

      reqTags.map(async (tag) => {
        const existingTag = await Tag.query().where('name', tag).first();
        if (existingTag) {
          createPostTagRelation(existingTag, createPost);
        } else {
          createPost.$relatedQuery('tags').insert({ name: tag });
        }
      });
    });

    await Activity.query().insert({
      id: uuid(),
      user_id: req.user.id,
      action_type_id: 1,
      activity_post: createPost.id,
    });
    return responseHandler(res, 201, createPost);
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
}

export async function getSlug(req, res, next) {
  try {
    const post = await Post
      .query()
      .where({ slug: req.params.slug })
      .eager('[tags, author]')
      .omit('password')
      .first();

    if (!post) {
      return res.status(400).json({ message: `Unable to find a post matching ${req.params.slug}.` });
    }
    return responseHandler(res, 200, post);
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

export async function getId(req, res, next) {
  try {
    const post = await Post
      .query()
      .findById(req.params.id)
      .eager('[tags, author]')
      .omit('password')
      .first();
    return responseHandler(res, 200, post);
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await Post
        .query()
        .delete()
        .where('id', req.params.id)
        .first();
    await Activity.query().insert({
      id: uuid(),
      user_id: req.user.id,
      action_type_id: 3,
    });
    return res.status(204).send({});
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

export function update(req, res) {
  debug(req.body);
  return Post.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(async (post) => {
      await Activity.query().insert({
        id: uuid(),
        user_id: req.user.id,
        action_type_id: 2,
        activity_post: post.id,
      });
      responseHandler(res, 202, post);
    });
}

export async function addTag(req, res, next) {
  try {
    const post = await Post
      .query()
      .findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: `Unable to find a post with the ID: ${req.params.id}.` });
    }

    const tag = await post
       .$relatedQuery('tags')
       .insert(req.body);

    return responseHandler(res, 202, tag);
  } catch (error) {
    return next(error);
  }
}
