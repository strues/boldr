import { Model } from 'objection';
import { BaseModel } from '../../core/base';

// Related Model
import Link from '../link/link.model';

class Navigation extends BaseModel {
  static get tableName() { return 'navigation'; }
  static addTimestamps = false;
  static addUUID = true;
  static get relationMappings() {
    return {
      links: {
        relation: Model.ManyToManyRelation,
        modelClass: Link,
        join: {
          from: 'navigation.id',
          through: {
            from: 'navigation_link.navigation_id',
            to: 'navigation_link.link_id',
          },
          to: 'link.id',
        },
      },
    };
  }
}

export default Navigation;
