import BaseModel, { mergeSchemas } from './BaseModel';
// Related Models
import User from './User';

class Attachment extends BaseModel {
  static tableName = 'attachment';
  static addTimestamps = true;
  static get relationMappings() {
    return {
      owner: {
        relation: BaseModel.BelongsToOneRelation,
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
