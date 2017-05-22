import { Model } from 'objection';
import User from './User';
import BaseModel from './Base';

class ResetToken extends BaseModel {
  static tableName = 'reset_token';
  static addTimestamps = true;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
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
