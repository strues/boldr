import uuid from 'uuid';
import { responseHandler, Conflict } from '../../core/index';
import slugIt from '../../utils/slugIt';

// Models
import Tag from '../tag/tag.model';
import Activity from '../activity/activity.model';
import Post from './post.model';
import PostTag from './postTag.model';

const debug = require('debug')('boldrAPI:post-controller');


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
  const checkExisting = await Post.query().where('slug', postSlug).first();

  if (checkExisting) {
    // return with error
    return next(new Conflict());
  }

  const newPost = await Post.query().insert({
    id: uuid(),
    title: req.body.title,
    slug: postSlug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    feature_image: req.body.feature_image,
    meta: req.body.meta,
  });

  await newPost.$relatedQuery('author').relate({ id: req.user.id });

  if (req.body.tags) {
    req.body.tags = req.body.tags.split(',', 5).map(tag => tag.substr(0, 15));
  }

  for (let i = 0; i < req.body.tags.length; i++) {
    const existingTag = await Tag.query().where('name', req.body.tags[i]).first();
    if (existingTag) {
      debug(existingTag, 'existing tag found');
      const taggedPost = await PostTag.query().insert({
        tag_id: existingTag.id,
        post_id: newPost.id,
      });
      debug(taggedPost);
    } else {
      await newPost.$relatedQuery('tags').insert({ name: req.body.tags[i] });
    }
  }

  await Activity.query().insert({
    id: uuid(),
    name: newPost.title,
    user_id: req.user.id,
    action: 'New post',
    type: 'create',
    data: { newPost },
    entry_uuid: newPost.id,
    entry_table: 'post',
  });
  return responseHandler(res, 201, newPost);
}

export async function getSlug(req, res) {
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
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
  }
}

export async function destroy(req, res, next) {
  await Post
      .query()
      .delete()
      .where('id', req.params.id)
      .first();

  return res.status(204).send({});
}

export function update(req, res) {
  return Post.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(post => responseHandler(res, 202, post));
}

export async function addTag(req, res, next) {
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
}
