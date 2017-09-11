import BaseModel, { mergeSchemas } from './BaseModel';

class Entity extends BaseModel {
  static tableName = 'entity';
  static addTimestamps = true;

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'slug', 'content', 'status', 'authorId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      title: { type: 'string' },
      slug: { type: 'string' },
      excerpt: { type: 'string' },
      image: { type: 'string' },
      meta: { type: 'json' },
      content: {
        type: 'string',
      },
      rawContent: { type: 'json' },
      status: { type: { enum: ['published', 'archived', 'draft'] } },
      authorId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      categoryId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      contentTypeId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  });

  static relationMappings = {
    author: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'article.author_id',
        to: 'account.id',
      },
    },
    contentType: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/ContentType`,
      join: {
        from: 'entity.content_type_id',
        to: 'content_type.id',
      },
    },
    category: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Category`,
      join: {
        from: 'entity.category_id',
        to: 'category.id',
      },
    },
    tags: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Tag`,
      join: {
        from: 'entity.id',
        through: {
          from: 'entity_tag.entity_id',
          to: 'entity_tag.tag_id',
        },
        to: 'tag.id',
      },
    },
  };

  static getEntities(offset, limit) {
    return Entity.query()
      .offset(offset)
      .limit(limit);
  }
}

export default Entity;
