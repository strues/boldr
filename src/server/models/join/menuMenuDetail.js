import { Model } from 'objection';
import MenuDetail from '../MenuDetail';
import Menu from '../Menu';
import BaseModel from '../Base';
/**
 * This is the join table connecting menus to menu details.
 *
 * @see ../Menu
 * @see ../MenuDetail
 * @extends ../BaseModel
 */
class MenuMenuDetail extends BaseModel {
  static tableName = 'menu_menu_detail';
  static addTimestamps = true;

  static get idColumn() {
    return ['menuId', 'menuDetailId'];
  }

  static get relationMappings() {
    return {
      detail: {
        relation: Model.BelongsToOneRelation,
        modelClass: MenuDetail,
        join: {
          from: 'menu_menu_detail.menuDetailId',
          to: 'menu_detail.id',
        },
      },
      menu: {
        relation: Model.BelongsToOneRelation,
        modelClass: Menu,
        join: {
          from: 'menu_menu_detail.menuId',
          to: 'menu.id',
        },
      },
    };
  }
}

export default MenuMenuDetail;
