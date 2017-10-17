import BaseModel from './BaseModel';

class Role extends BaseModel {
  static tableName = 'role';
  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    uniqueProperties: ['name'],
    additionalProperties: false,
    properties: {
      id: {
        type: 'number',
      },
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
        pattern: '^[A-Za-z0-9-_]+$',
      },
      icon: {
        type: 'string',
        maxLength: 255,
      },
      description: {
        type: 'string',
        maxLength: 255,
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
      deletedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    },
  };
  static relationMappings = {
    accounts: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'role.id',
        through: {
          from: 'account_role.role_id',
          to: 'account_role.account_id',
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
