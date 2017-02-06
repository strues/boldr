import { Model } from 'objection';
import BaseModel from './base';
import User from './user';

class VerificationToken extends BaseModel {
  static get tableName() { return 'verification_token'; }
  static addTimestamps = true;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'verification_token.user_id',
          to: 'user.id',
        },
      },
    };
  }

}

export default VerificationToken;
