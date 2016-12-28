import { Model } from 'objection';
import MenuDetail from './detail/menuDetail.model';
import Menu from './menu.model';

class MenuMenuDetail extends Model {
  static get tableName() {
    return 'menu_menu_detail';
  }
  static addTimestamps = false;
  static addUUID = false;
  static get idColumn() {
    return ['menu_id', 'menu_detail_id'];
  }

  static get relationMappings() {
    return {
      detail: {
        relation: Model.BelongsToOneRelation,
        modelClass: MenuDetail,
        join: {
          from: 'menu_menu_detail.menu_detail_id',
          to: 'menu_detail.id',
        },
      },
      menu: {
        relation: Model.BelongsToOneRelation,
        modelClass: Menu,
        join: {
          from: 'menu_menu_detail.menu_id',
          to: 'menu.id',
        },
      },
    };
  }
}

export default MenuMenuDetail;
