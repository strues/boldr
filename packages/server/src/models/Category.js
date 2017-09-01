import BaseModel, { mergeSchemas } from './BaseModel';

class Category extends BaseModel {
  static tableName = 'category';
  static addTimestamps = true;

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['name', 'slug'],
    properties: {
      id: {
        type: 'string',
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
        maxLength: 255,
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
