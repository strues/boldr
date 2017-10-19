import BaseModel from '../BaseModel';
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

  static addTimestamps = false;

  static idColumn = ['account_id', 'role_id'];

  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['accountId', 'roleId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      roleId: {
        type: 'number',
      },
      accountId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  };

  static relationMappings = {
    role: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'account_role.role_id',
        to: 'role.id',
      },
    },
    account: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Account,
      join: {
        from: 'account_role.account_id',
        to: 'account.id',
      },
    },
  };
}

export default AccountRole;
