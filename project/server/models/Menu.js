import BaseModel from './BaseModel';

class Menu extends BaseModel {
  static tableName = 'menu';

  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    required: ['safeName', 'name', 'restricted'],
    uniqueProperties: ['safeName'],
    additionalProperties: false,
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
      name: {
        type: 'string',
        maxLength: 50,
      },
      safeName: {
        type: 'string',
        maxLength: 50,
      },
      restricted: { type: 'boolean', default: false },

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
