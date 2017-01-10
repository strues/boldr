
import { responseHandler, Conflict, BadRequest } from '../../core/index';
import Tag from '../tag/tag.model';
import User from '../user/user.model';
import Post from '../post/post.model';

export async function getAllStats(req, res, next) {
  try {
    const postStats = await Post.query().count();
    const tagStats = await Tag.query().count();
    const userStats = await User.query().count();

    const payload = {
      posts: parseInt(postStats[0].count, 10),
      tags: parseInt(tagStats[0].count, 10),
      users: parseInt(userStats[0].count, 10),
    };

    return responseHandler(res, 200, payload);
  } catch (error) {
    return next(new BadRequest());
  }
}
