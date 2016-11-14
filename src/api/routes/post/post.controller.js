import findQuery from 'objection-find';
import slugify from 'slugify';
import uuid from 'node-uuid';
import { responseHandler, InternalServer, Conflict, NotFound } from '../../core';
import Tag from '../tag/tag.model';
import Activity from '../activity/activity.model';
import Post from './post.model';
import PostTag from './postTag.model';

const debug = require('debug')('boldr:post-controller');

export function listPosts(req, res) {
  return findQuery(Post)
    .build(req.query.filter)
    .eager(req.query.include)
    .omit('password')
    .skipUndefined()
    .orderBy(req.query.sort.by, req.query.sort.order)
    // .page(req.query.page.number, req.query.page.size)
    .then(posts => responseHandler(null, res, 200, posts))
    .catch(err => responseHandler(err, res));
}

export async function createPost(req, res, next) {
  req.assert('title', 'A title must be provided').notEmpty();
  req.assert('content', 'Content can not be empty').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const postSlug = slugify(req.body.title);

  // look for a matching slug in the database
  const checkExisting = await Post.query().where('slug', postSlug).first();

  if (checkExisting) {
    // return with error
    return next(new Conflict());
  }

  const newPost = await Post.query().insert({
    id: uuid.v4(),
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
    // @TODO There might be a better / more efficient way than a for loop, but
    // fuck it. its late and it works for now.
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
    id: uuid.v4(),
    name: newPost.title,
    user_id: req.user.id,
    action: 'New post',
    type: 1,
    data: { newPost },
    entry_id: newPost.id,
    entry_table: 'post',
  });
  return res.status(201).json(newPost);
}

async function getSlug(req, res) {
  const post = await Post
    .query()
    .where({ slug: req.params.slug })
    .eager('[tags, author]')
    .omit('password')
    .first();

  if (!post) {
    return res.status(404).json('Unable to find the requested post.');
  }
  return responseHandler(null, res, 200, post);
}

async function getId(req, res, next) {
  try {
    const post = await Post
      .query()
      .findById(req.params.id)
      .eager('[tags, author]')
      .omit('password')
      .first();
    return responseHandler(null, res, 200, post);
  } catch (error) {
    return next(new InternalServer());
  }
}

async function destroy(req, res, next) {
  await Post
      .query()
      .delete()
      .where('id', req.params.id)
      .first();

  return res.status(204).send({});
}

function update(req, res) {
  return Post.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(post => res.status(202).json(post));
}

async function addTag(req, res, next) {
  const post = await Post
    .query()
    .findById(req.params.id);

  if (!post) {
    return next(new NotFound());
  }

  const tag = await post
     .$relatedQuery('tags')
     .insert(req.body);

  return res.status(202).json(tag);
}

export { getSlug, destroy, update, getId, addTag };
