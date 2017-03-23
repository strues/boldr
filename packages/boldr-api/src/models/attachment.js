import { Model } from 'objection';
import BaseModel from './base';
// Related Models
import User from './user';
import Post from './post';
import Activity from './activity';

class Attachment extends BaseModel {
  static get tableName() {
    return 'attachment';
  }
  static addTimestamps = true;
  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'attachment.user_id',
          to: 'user.id',
        },
      },
      posts: {
        relation: Model.ManyToManyRelation,
        modelClass: Post,
        join: {
          from: 'attachment.id',
          through: {
            from: 'post_attachment.attachment_id',
            to: 'post_attachment.post_id',
          },
          to: 'post.id',
        },
      },
      activity: {
        relation: Model.BelongsToOneRelation,
        modelClass: Activity,
        join: {
          from: 'attachment.id',
          to: 'activity.activity_attachment',
        },
      },
    };
  }
}

export default Attachment;
