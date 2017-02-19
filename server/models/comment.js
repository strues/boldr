import { Model } from 'objection';

// Related Models
import Post from './post';
import User from './user';
import BaseModel from './base';

class Comment extends BaseModel {
  static get tableName() {
    return 'comment';
  }
  static addTimestamps = true;
  static hidden = ['commenter.password'];

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      commenter: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comment.comment_author_id',
          to: 'user.id',
        },
      },
      post: {
        relation: Model.ManyToManyRelation,
        modelClass: Post,
        join: {
          from: 'comment.id',
          through: {
            from: 'post_comment.comment_id',
            to: 'post_comment.post_id',
          },
          to: 'post.id',
        },
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'comment.id',
          to: 'comment.comment_parent_id',
        },
      },
    };
  }
}

export default Comment;
