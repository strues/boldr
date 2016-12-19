import { Model } from 'objection';
import { BaseModel } from '../../core/base';
// Related Model
import Navigation from '../navigation/navigation.model';

class Link extends BaseModel {
  static get tableName() { return 'link'; }
  static addTimestamps = false;
  static addUUID = true;
  static get relationMappings() {
    return {
      navigation: {
        relation: Model.ManyToManyRelation,
        modelClass: Navigation,
        join: {
          from: 'link.id',
          through: {
            from: 'navigation_link.link_id',
            to: 'navigation_link.navigation_id',
          },
          to: 'navigation.id',
        },
      },
    };
  }
}

export default Link;
