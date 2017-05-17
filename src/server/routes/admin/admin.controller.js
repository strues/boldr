import { slugIt } from '../../utils';
import { responseHandler, Conflict, BadRequest } from '../../core/index';
import { Tag, User, Article, ContentType, MediaType } from '../../models';

/**
 * Returns a list of all stats
 * @method getAllStats
 * @param  {Object}        req  the request object
 * @param  {Object}        res  the response object
 * @return {Promise}
 */
export async function getAllStats(req, res, next) {
  try {
    const articleStats = await Article.query().count('*');
    const tagStats = await Tag.query().count('*');
    const userStats = await User.query().count('*');

    const payload = {
      articles: parseInt(articleStats[0].count, 10),
      tags: parseInt(tagStats[0].count, 10),
      users: parseInt(userStats[0].count, 10),
    };

    return responseHandler(res, 200, payload);
  } catch (error) {
    /* istanbul ignore next */
    return next(new BadRequest());
  }
}
/**
 * [listContentTypes description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export async function listContentTypes(req, res, next) {
  try {
    const contentTypes = await ContentType.query();
    return res.status(200).json(contentTypes);
  } catch (error) {
    return next(error);
  }
}

/**
 * [addContentType description]
 * @param {[type]}   req  [description]
 * @param {[type]}   res  [description]
 * @param {Function} next [description]
 */
export async function addContentType(req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      safeName: slugIt(req.body.name),
      image: req.body.image,
      description: req.body.description,
    };
    const newContentType = await ContentType.query().insert(payload);
    return res.status(201).json(newContentType);
  } catch (error) {
    return next(error);
  }
}
/**
 * [listMediaTypes description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export async function listMediaTypes(req, res, next) {
  try {
    const mediaTypes = await MediaType.query()
      .allowEager('[files]')
      .eager(req.query.eager)
      .skipUndefined();
    return res.status(200).json(mediaTypes);
  } catch (error) {
    return next(error);
  }
}
