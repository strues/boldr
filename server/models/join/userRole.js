import { Model } from 'objection';
import Role from '../role';
import BaseModel from '../base';
import User from '../user';

/**
 * This is the pivot table connecting users to roles.
 *
 * Users can only have one of the same role.
 *
 * @see ../Role
 * @see ../User
 * @see ../../../db/migrations/20160924191402_user_roles.js
 * @extends ./BaseModel
 */
class UserRole extends BaseModel {
  static tableName = 'user_role';
  static addTimestamps = false;
  static addUUID = false;

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'user_role.role_id',
        to: 'role.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'user_role.user_id',
        to: 'user.id',
      },
    },
  };
}

export default UserRole;
