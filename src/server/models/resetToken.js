import { Model } from 'boldr-orm';
import User from './User';

class ResetToken extends Model {
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
          from: 'reset_token.userId',
          to: 'user.id',
        },
      },
    };
  }
}

export default ResetToken;
