import { Model } from 'objection';
import BaseModel from './base';
// Related Models
import User from './user';
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
          from: 'attachment.userId',
          to: 'user.id',
        },
      },
      // posts: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: Post,
      //   join: {
      //     from: 'attachment.id',
      //     through: {
      //       from: 'post_attachment.attachmentId',
      //       to: 'post_attachment.postId',
      //     },
      //     to: 'post.id',
      //   },
      // },
      activity: {
        relation: Model.BelongsToOneRelation,
        modelClass: Activity,
        join: {
          from: 'attachment.id',
          to: 'activity.activityAttachment',
        },
      },
    };
  }
}

export default Attachment;
