import BaseModel from './BaseModel';

class ContentType extends BaseModel {
  static tableName = 'content_type';
  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    required: ['name', 'slug'],
    uniqueProperties: ['name', 'slug'],
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
        maxLength: 255,
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
    entities: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Entity`,
      join: {
        from: 'content_type.id',
        to: 'entity.content_type_id',
      },
    },
  };

  static getGontentTypes(offset, limit) {
    return ContentType.query()
      .offset(offset)
      .limit(limit);
  }
}

export default ContentType;
