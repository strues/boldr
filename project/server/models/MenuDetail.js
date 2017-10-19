import BaseModel from './BaseModel';

class MenuDetail extends BaseModel {
  static tableName = 'menu_detail';

  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    required: ['safeName', 'name', 'hasDropdown', 'isDropdown', 'menuId', 'href', 'icon'],
    uniqueProperties: ['safeName'],
    additionalProperties: false,
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      name: {
        type: 'string',
        maxLength: 50,
      },
      safeName: {
        type: 'string',
        maxLength: 50,
      },
      cssClassname: { type: 'string', maxLength: 32 },
      hasDropdown: { type: 'boolean', default: false },
      isDropdown: { type: 'boolean', default: false },
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
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
      deletedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    },
  };

  static relationMappings = {
    menu: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Menu`,
      join: {
        from: 'menu_detail.menu_id',
        to: 'menu.id',
      },
    },
    dropdownItems: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/MenuDetail`,
      join: {
        from: 'menu_detail.id',
        to: 'menu_detail.parent_id',
      },
    },
    dropdown: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/MenuDetail`,
      join: {
        from: 'menu_detail.parent_id',
        to: 'menu_detail.id',
      },
    },
  };
}

export default MenuDetail;
