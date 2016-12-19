import { Model } from 'objection';
import { BaseModel } from 'core/base';
// Related Model
import User from '../user/user.model';

class Activity extends BaseModel {
  static get tableName() { return 'activity'; }
  static addTimestamps = true;
  static addUUID = false;
  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'activity.user_id',
          to: 'user.id',
        },
      },
    };
  }
}

export default Activity;
