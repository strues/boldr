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
  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'role.id',
          through: {
            from: 'user_role.roleId',
            to: 'user_role.userId',
            modelClass: `${__dirname}/join/UserRole`,
          },
          to: 'user.id',
        },
      },
    };
  }

  static getUsersForRole(id) {
    return Role.query()
      .findById(id)
      .eager('[users]')
      .returning('*');
  }

  getUsersForRole() {
    return this.constructor.getUsersForRole(this.id);
  }
}

export default Role;
