import { Model } from 'objection';
import Role from '../role';
import BaseModel from '../base';
import User from '../user';

/**
 * This is the join table connecting users to roles.
 *
 * Users can only have one of the same role.
 *
 * @see ../Role
 * @see ../User
 * @extends ../BaseModel
 */
class UserRole extends BaseModel {
  static tableName = 'user_role';
  static addTimestamps = false;
  static jsonSchema = {
    type: 'object',
    required: ['userId', 'roleId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      roleId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      userId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  };
  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'user_role.roleId',
        to: 'role.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'user_role.userId',
        to: 'user.id',
      },
    },
  };
}

export default UserRole;
