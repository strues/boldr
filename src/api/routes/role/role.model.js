import { Model } from 'objection';
import User from '../user/user.model';
import BaseModel from '../../core/base/BaseModel';

class Role extends BaseModel {
  static get tableName() {
    return 'role';
  }

  static get relationMappings() {
    return {
      role: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'role.id',
          through: {
            from: 'user_role.role_id',
            to: 'user_role.user_id',
          },
          to: 'user.id',
        },
      },
    };
  }
}

export default Role;
