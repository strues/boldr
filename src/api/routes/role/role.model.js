import { Model } from 'objection';
import BaseModel from 'core/base/BaseModel';
// Related Model
import User from '../user/user.model';

class Role extends BaseModel {
  static get tableName() {
    return 'role';
  }
  static addTimestamps = true;
  static addUUID = true;
  static hidden = ['password'];
  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'role.id',
          to: 'user.role',
        },
      },
    };
  }
}

export default Role;
