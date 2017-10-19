import BaseModel from './BaseModel';

class Category extends BaseModel {
  static tableName = 'category';

  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    required: ['name', 'slug'],
    uniqueProperties: ['slug'],
    additionalProperties: false,
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
        pattern: '^[A-Za-z0-9-_]+$',
      },
      slug: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
      },
      description: {
        type: 'string',
        minLength: 3,
      },
      icon: {
        type: 'string',
        maxLength: 255,
      },
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
    articles: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'category.id',
        to: 'article.category_id',
      },
    },
    entities: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Entity`,
      join: {
        from: 'category.id',
        to: 'entity.category_id',
      },
    },
  };
}

export default Category;
