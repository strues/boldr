import { Model } from 'objection';
import BaseModel from './base';
// Related Model
import User from './user';
import UserRole from './join/userRole';

class Role extends BaseModel {
  static get tableName() {
    return 'role';
  }
  static addTimestamps = true;
  static hidden = ['password'];
  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'role.id',
          through: {
            from: 'user_role.role_id',
            to: 'user_role.user_id',
          },
          to: 'user.id',
        },
      },
    };
  }
}

export default Role;
