import BaseModel from './BaseModel';

class Menu extends BaseModel {
  static tableName = 'menu';
  static addTimestamps = true;

  static relationMappings = {
    details: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/MenuDetail`,
      join: {
        from: 'menu.id',
        to: 'menu_detail.menu_id',
      },
    },
  };

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
