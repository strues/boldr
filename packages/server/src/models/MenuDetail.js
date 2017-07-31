import BaseModel, { mergeSchemas } from './BaseModel';
// Related Model
import Menu from './Menu';

class MenuDetail extends BaseModel {
  static tableName = 'menu_detail';
  static addTimestamps = false;
  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['safeName', 'name', 'hasDropdown', 'href', 'icon'],
    properties: {
      id: {
        type: 'number',
      },
      uuid: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      safeName: { type: 'string' },
      name: { type: 'string' },
      cssClassname: { type: 'string' },
      hasDropdown: { type: 'boolean' },
      order: { type: 'number' },
      mobileHref: { type: 'string' },
      href: { type: 'string' },
      icon: { type: 'string' },
      children: { type: 'json' },
      createdAt: { type: 'date-time' },
      updatedAt: { type: 'date-time' },
    },
  });
  static get relationMappings() {
    return {
      menu: {
        relation: BaseModel.ManyToManyRelation,
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
