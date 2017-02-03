import { Model } from 'objection';
import MenuDetail from '../menuDetail';
import Menu from '../menu';
import BaseModel from '../base';

/**
 * This is the join table connecting menus to menu details.
 *
 * @see ../Menu
 * @see ../MenuDetail
 * @extends ../BaseModel
 */
class MenuMenuDetail extends BaseModel {
  static get tableName() {
    return 'menu_menu_detail';
  }
  static addTimestamps = false;

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
