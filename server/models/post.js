import { Model } from 'objection';
import { slugIt } from '../utils';

// Related Models
import Tag from './tag';
import User from './user';
import Attachment from './attachment';
import BaseModel from './base';
import Comment from './comment';

class Post extends BaseModel {
  static get tableName() {
    return 'post';
  }
  static softDelete = true;
  static addTimestamps = true;
  static hidden = ['password'];
  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'post.user_id',
          to: 'user.id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: 'post.id',
          through: {
            from: 'post_tag.post_id',
            to: 'post_tag.tag_id',
          },
          to: 'tag.id',
        },
      },
      attachments: {
        relation: Model.ManyToManyRelation,
        modelClass: Attachment,
        join: {
          from: 'post.id',
          through: {
            from: 'post_attachment.post_id',
            to: 'post_attachment.attachment_id',
          },
          to: 'attachment.id',
        },
      },
      comments: {
        relation: Model.ManyToManyRelation,
        modelClass: Comment,
        join: {
          from: 'post.id',
          through: {
            from: 'post_comment.post_id',
            to: 'post_comment.comment_id',
          },
          to: 'comment.id',
        },
      },
    };
  }
}

export default Post;
