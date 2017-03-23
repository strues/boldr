import { Model } from 'objection';
import BaseModel from './base';
import User from './user';

class ResetToken extends BaseModel {
  static get tableName() {
    return 'reset_token';
  }
  static addTimestamps = true;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'reset_token.user_id',
          to: 'user.id',
        },
      },
    };
  }
}

export default ResetToken;
