import { Model } from 'boldr-orm';
// Related Model
import Menu from './Menu';

class MenuDetail extends Model {
  static get tableName() {
    return 'menu_detail';
  }
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
