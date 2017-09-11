import BaseModel, { mergeSchemas } from './BaseModel';

class Role extends BaseModel {
  static tableName = 'role';
  static addTimestamps = true;
  static hidden = ['password'];
  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['name'],
    properties: {
      id: {
        type: 'number',
      },
      uuid: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
        pattern: '^[A-Za-z0-9-_]+$',
      },
      image: {
        type: 'string',
        maxLength: 255,
      },
      description: {
        type: 'string',
        maxLength: 255,
      },
    },
  });
  static relationMappings = {
    accounts: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'role.id',
        through: {
          from: 'account_role.roleId',
          to: 'account_role.accountId',
          modelClass: `${__dirname}/join/AccountRole`,
        },
        to: 'account.id',
      },
    },
  };

  static getAccountsForRole(id) {
    return Role.query()
      .findById(id)
      .eager('[accounts]')
      .returning('*');
  }

  getAccountsForRole() {
    return this.constructor.getAccountsForRole(this.id);
  }
}

export default Role;
