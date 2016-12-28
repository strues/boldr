import { Model } from 'objection';
import { BaseModel } from '../../core/base';

// Related Model
import MenuDetail from './detail/menuDetail.model';

class Menu extends BaseModel {
  static get tableName() { return 'menu'; }
  static addTimestamps = false;
  static addUUID = true;
  static get relationMappings() {
    return {
      details: {
        relation: Model.ManyToManyRelation,
        modelClass: MenuDetail,
        join: {
          from: 'menu.id',
          through: {
            from: 'menu_menu_detail.menu_id',
            to: 'menu_menu_detail.menu_detail_id',
          },
          to: 'menu_detail.id',
        },
      },
    };
  }
}

export default Menu;
