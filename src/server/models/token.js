import { Model } from 'objection';
import BaseModel from './base';
import User from './user';

class Token extends BaseModel {
  static get tableName() { return 'token'; }
  static addTimestamps = true;
  static addUUID = false;
  static get relationMappings() {
    return {
      tokens: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'token.user_id',
          to: 'user.id',
        },
      },
    };
  }

}

export default Token;
