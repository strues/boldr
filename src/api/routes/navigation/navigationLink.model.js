import { join } from 'path';
import { Model } from 'objection';
import Link from '../link/link.model';
import Navigation from './navigation.model';

class NavigationLink extends Model {
  static get tableName() {
    return 'navigation_link';
  }
  static addTimestamps = false;
  static addUUID = false;
  static get idColumn() {
    return ['navigation_id', 'link_id'];
  }

  static get relationMappings() {
    return {
      link: {
        relation: Model.BelongsToOneRelation,
        modelClass: Link,
        join: {
          from: 'navigation_link.link_id',
          to: 'link.id',
        },
      },
      navigation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Navigation,
        join: {
          from: 'navigation_link.navigation_id',
          to: 'navigation.id',
        },
      },
    };
  }
}

export default NavigationLink;
