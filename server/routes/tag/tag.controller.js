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
export { listTags, getTaggedPosts, getTaggedPostsByName };
