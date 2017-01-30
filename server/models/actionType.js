import { Model } from 'objection';
import BaseModel from './base';
import Activity from './activity';

class ActionType extends BaseModel {
  static get tableName() { return 'action_type'; }
  static addTimestamps = false;

  static get relationMappings() {
    return {
      pages: {
        relation: Model.HasManyRelation,
        modelClass: Activity,
        join: {
          from: 'action_type.id',
          to: 'activity.action_type_id',
        },
      },
    };
  }
}

export default ActionType;
