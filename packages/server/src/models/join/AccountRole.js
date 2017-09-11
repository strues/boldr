import BaseModel, { mergeSchemas } from '../BaseModel';
import Role from '../Role';
import Account from '../Account';
/**
 * This is the join table connecting accounts to roles.
 *
 * Users can only have one of the same role.
 *
 * @see ../Role
 * @see ../Account
 * @extends ../BaseModel
 */
class AccountRole extends BaseModel {
  static tableName = 'account_role';
  static addTimestamps = true;
  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['accountId', 'roleId'],
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
      accountId: {
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
        from: 'account_role.roleId',
        to: 'role.id',
      },
    },
    account: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Account,
      join: {
        from: 'account_role.accountId',
        to: 'account.id',
      },
    },
  };
}

export default AccountRole;
