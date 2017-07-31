import BaseModel, { mergeSchemas } from './BaseModel';

class Page extends BaseModel {
  static tableName = 'page';
  static addTimestamps = true;
  // static get relationMappings() {
  //   return {
  //     details: {
  //       relation: BaseModel.ManyToManyRelation,
  //       modelClass: MenuDetail,
  //       join: {
  //         from: 'menu.id',
  //         through: {
  //           from: 'menu_menu_detail.menuId',
  //           to: 'menu_menu_detail.menuDetailId',
  //         },
  //         to: 'menu_detail.id',
  //       },
  //     },
  //   };
  // }
  //
  // static getMenus() {
  //   return Menu.query();
  // }
  // static getById(id) {
  //   return Menu.query().where({ id }).eager('[details]');
  // }
}

export default Page;
