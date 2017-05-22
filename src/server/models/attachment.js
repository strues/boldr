import { Model } from 'objection';
// Related Models
import User from './User';
import BaseModel from './Base';

class Attachment extends BaseModel {
  static tableName = 'attachment';
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
    };
  }
  static listAttachments(offset, limit) {
    return Attachment.query().offset(offset).limit(limit);
  }
}

export default Attachment;
