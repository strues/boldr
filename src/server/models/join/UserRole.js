import BaseModel, { mergeSchemas } from '../BaseModel';
import Role from '../Role';
import User from '../User';
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
  static addTimestamps = true;
  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
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
  });
  static relationMappings = {
    role: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'user_role.roleId',
        to: 'role.id',
      },
    },
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'user_role.userId',
        to: 'user.id',
      },
    },
  };
}

export default UserRole;
