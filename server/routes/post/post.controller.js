import uuid from 'uuid';
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
    return next(new BadRequest(err));
  }
}

export async function createPost(req, res, next) {
  req.assert('title', 'A title must be provided').notEmpty();
  req.assert('content', 'Content can not be empty').notEmpty();
  req.sanitize('title').trim();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const postSlug = slugIt(req.body.title);

  // look for a matching slug in the database
  const existingPost = await Post.query().where('slug', postSlug).first();
  if (existingPost) {
    // return with error
    return res.status(409).json('A post with this title already exists.');
  }

  const newPost = await Post.query().insert({
    title: req.body.title,
    slug: postSlug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    feature_image: req.body.feature_image,
    meta: req.body.meta,
    published: req.body.published,
    user_id: req.user.id,
  });

  await newPost.$relatedQuery('author').relate({ id: req.user.id });

  if (!req.body.tags) {
    return next(new BadRequest('You must enter tags'));
  }
  req.body.tags = req.body.tags.split(',', 5).map(tag => tag.substr(0, 15));

  async function createPostTagRelation(existingTag, newPost) {
    await PostTag.query().insert({ tag_id: existingTag.id, post_id: newPost.id });
  }

  for (let i = 0; i < req.body.tags.length; i++) {
    const existingTag = await Tag.query().where('name', req.body.tags[i]).first();
    if (existingTag) {
      createPostTagRelation(existingTag, newPost);
    } else {
      newPost.$relatedQuery('tags').insert({ name: req.body.tags[i] });
    }
  }

  await Activity.query().insert({
    id: uuid(),
    user_id: req.user.id,
    action_type_id: 1,
    activity_post: newPost.id,
  });
  return responseHandler(res, 201, newPost);
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
      return res.status(404).json({ message: `Unable to find a post matching ${req.params.slug}.` });
    }
    return responseHandler(res, 200, post);
  } catch (error) {
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
