import BaseModel, { mergeSchemas } from './BaseModel';
import User from './User';

class ResetToken extends BaseModel {
  static tableName = 'reset_token';
  static addTimestamps = true;

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'reset_token.userId',
          to: 'user.id',
        },
      },
    };
  }
}

export default ResetToken;
