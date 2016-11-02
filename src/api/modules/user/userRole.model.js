import { Model } from 'objection';
import Role from '../role/role.model';
import User from './user.model';

class UserRole extends Model {
  static get tableName() {
    return 'user_role';
  }

  static get idColumn() {
    return ['user_id', 'role_id'];
  }

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'user_role.role_id',
          to: 'role.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_role.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

export default UserRole;
