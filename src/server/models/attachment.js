import { Model } from 'boldr-orm';
import BaseModel from './Base';
// Related Models
import User from './User';

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
    };
  }
  static listAttachments(offset, limit) {
    return Attachment.query().offset(offset).limit(limit);
  }
}

export default Attachment;
