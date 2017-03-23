import { Model } from 'objection';
import Comment from '../comment';
import Post from '../post';
import BaseModel from '../base';

/**
 * This is the join table connecting comments to posts.
 *
 * @see ../Comment
 * @see ../Post
 * @extends ../BaseModel
 */
class PostComment extends BaseModel {
  static get tableName() {
    return 'post_comment';
  }

  static addTimestamps = false;

  static get idColumn() {
    return ['post_id', 'comment_id'];
  }

  static get relationMappings() {
    return {
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: 'post_comment.comment_id',
          to: 'comment.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'post_comment.post_id',
          to: 'post.id',
        },
      },
    };
  }
}

export default PostComment;
