import { responseHandler } from '../../core';
import Tag from '../../models/tag';

const debug = require('debug')('boldr:post-controller');

async function listTags(req, res, next) {
  try {
    const allTags = await Tag.query().eager('[posts]').skipUndefined();
    return responseHandler(res, 200, allTags);
  } catch (err) {
    return res.status(404).json(err);
  }
}

async function getTaggedPosts(req, res) {
  const tags = await Tag
    .query()
    .findById(req.params.id)
    .eager('[posts]')
    .first();
  return responseHandler(res, 200, tags);
}

async function getTaggedPostsByName(req, res) {
  const tags = await Tag
    .query()
    .where({ name: req.params.name })
    .eager('[posts]')
    .first();
  debug(tags);
  return responseHandler(res, 200, tags);
}

async function createTag(req, res) {
  try {
    const newTag = await Tag.query().insert(req.body);
    await Activity.query().insert({
      id: uuid(),
      user_id: req.user.id,
      action_type_id: 1,
      activity_tag: newTag.id,
    });
    return responseHandler(res, 201, newTag);
  } catch (err) {
    return res.status(500).json(err);
  }
}

function updateTag(req, res) {
  debug(req.body);
  return Tag.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(async (tag) => {
      // await Activity.query().insert({
      //   id: uuid(),
      //   user_id: req.user.id,
      //   action_type_id: 2,
      //   activity_post: post.id,
      // });
      responseHandler(res, 202, tag);
    });
}

function deleteTag(req, res) {
  return Tag.query()
    .deleteById(req.params.id)
    .then(() => responseHandler(res, 204));
}

async function relateTagToPost(req, res, next) {
  try {
    const tag = await Tag.query().findById(req.params.id);
    const newRelation = await tag.$relatedQuery('posts').relate({ id: req.params.postid });
    return res.status(200).json(newRelation);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export { listTags, getTaggedPosts, getTaggedPostsByName, createTag, updateTag, deleteTag, relateTagToPost };
