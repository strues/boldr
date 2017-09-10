import BaseModel, { mergeSchemas } from './BaseModel';

class Category extends BaseModel {
  static tableName = 'category';
  static addTimestamps = true;

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['name', 'slug'],
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
    },
  });
  static get relationMappings() {
    return {
      articles: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/Article`,
        join: {
          from: 'category.id',
          to: 'article.categoryId',
        },
      },
      entities: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/Entity`,
        join: {
          from: 'category.id',
          to: 'entity.categoryId',
        },
      },
    };
  }
}

export default Category;
