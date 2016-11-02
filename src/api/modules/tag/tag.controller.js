import { responseHandler } from '../../core';

import Tag from './tag.model';

const debug = require('debug')('boldr:post-controller');

async function getTaggedPosts(req, res) {
  const tags = await Tag
    .query()
    .findById(req.params.id)
    .eager('[posts]')
    .first();
  return responseHandler(null, res, 200, tags);
}

async function getTaggedPostsByName(req, res) {
  const tags = await Tag
    .query()
    .where({ name: req.params.name })
    .eager('[posts]')
    .first();
  debug(tags);
  return responseHandler(null, res, 200, tags);
}
export { getTaggedPosts, getTaggedPostsByName };
