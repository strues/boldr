import { Model } from 'objection';
import { BaseModel } from '../../../core/base';
// Related Model
import Menu from '../menu.model';

class MenuDetail extends BaseModel {
  static get tableName() { return 'menu_detail'; }
  static addTimestamps = false;
  static addUUID = true;
  static get relationMappings() {
    return {
      menu: {
        relation: Model.ManyToManyRelation,
        modelClass: Menu,
        join: {
          from: 'menu_detail.id',
          through: {
            from: 'menu_menu_detail.menu_detail_id',
            to: 'menu_menu_detail.menu_id',
          },
          to: 'menu.id',
        },
      },
    };
  }
}

export default MenuDetail;
