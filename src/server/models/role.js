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
  static jsonSchema = {
    type: 'object',
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
  };
  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'role.id',
          through: {
            from: 'user_role.roleId',
            to: 'user_role.userId',
          },
          to: 'user.id',
        },
      },
    };
  }
}

export default Role;
