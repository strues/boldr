import { Model } from 'objection';
import BaseModel from '../../core/base/BaseModel';
import User from '../user/user.model';

class Token extends BaseModel {
  static get tableName() { return 'token'; }

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
