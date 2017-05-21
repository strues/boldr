import { Model } from 'boldr-orm';
import BaseModel from './Base';

// Related Model
import MenuDetail from './MenuDetail';

class Menu extends BaseModel {
  static get tableName() {
    return 'menu';
  }
  static addTimestamps = false;
  static get relationMappings() {
    return {
      details: {
        relation: Model.ManyToManyRelation,
        modelClass: MenuDetail,
        join: {
          from: 'menu.id',
          through: {
            from: 'menu_menu_detail.menuId',
            to: 'menu_menu_detail.menuDetailId',
          },
          to: 'menu_detail.id',
        },
      },
    };
  }

  static getMenus() {
    return Menu.query();
  }
  static getById(id) {
    return Menu.query().where({ id });
  }
}

export default Menu;