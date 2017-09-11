import BaseModel, { mergeSchemas } from './BaseModel';

class MenuDetail extends BaseModel {
  static tableName = 'menu_detail';
  static addTimestamps = true;

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['safeName', 'name', 'hasDropdown', 'href', 'icon'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      safeName: { type: 'string' },
      name: { type: 'string' },
      cssClassname: { type: 'string' },
      hasDropdown: { type: 'boolean' },
      isDropdown: { type: 'boolean' },
      order: { type: 'number' },
      menuId: { type: 'number' },
      parentId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      href: { type: 'string' },
      icon: { type: 'string' },
    },
  });

  static relationMappings = {
    menu: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Menu`,
      join: {
        from: 'menu_detail.menuId',
        to: 'menu.id',
      },
    },
    dropdownItems: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/MenuDetail`,
      join: {
        from: 'menu_detail.id',
        to: 'menu_detail.parentId',
      },
    },
    dropdown: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/MenuDetail`,
      join: {
        from: 'menu_detail.parentId',
        to: 'menu_detail.id',
      },
    },
  };
}

export default MenuDetail;
