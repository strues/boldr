import { Model } from 'objection';
// Related Model
import Menu from './Menu';
import BaseModel from './Base';

class MenuDetail extends BaseModel {
  static tableName = 'menu_detail';
  static addTimestamps = false;
  static get relationMappings() {
    return {
      menu: {
        relation: Model.ManyToManyRelation,
        modelClass: Menu,
        join: {
          from: 'menu_detail.id',
          through: {
            from: 'menu_menu_detail.menuDetailId',
            to: 'menu_menu_detail.menuId',
          },
          to: 'menu.id',
        },
      },
    };
  }
}

export default MenuDetail;
