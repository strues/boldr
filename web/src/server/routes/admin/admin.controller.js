import { slugIt } from '../../utils';
import { responseHandler, Conflict, BadRequest } from '../../core/index';
import Tag from '../../models/Tag';
import User from '../../models/User';
import Article from '../../models/Article';

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
