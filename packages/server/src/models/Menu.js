import BaseModel from './BaseModel';

class Menu extends BaseModel {
  static tableName = 'menu';
  static addTimestamps = false;
  static get relationMappings() {
    return {
      details: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: `${__dirname}/MenuDetail`,
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
    return Menu.query()
      .findById(id)
      .eager('[details]');
  }
}

export default Menu;
