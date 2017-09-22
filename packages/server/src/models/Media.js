import BaseModel from './BaseModel';

class Media extends BaseModel {
  static tableName = 'media';
  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    required: ['name', 'safeName', 'path', 'url'],
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
        maxLength: 128,
      },
      safeName: {
        type: 'string',
        minLength: 3,
        maxLength: 128,
      },
      thumbName: {
        type: 'string',
        minLength: 3,
        maxLength: 128,
      },
      size: {
        type: 'number',
      },
      fileDescription: {
        type: 'string',
        minLength: 3,
      },
      type: {
        type: 'string',
        maxLength: 255,
      },
      url: {
        type: 'string',
        maxLength: 255,
      },
      path: {
        type: 'string',
        maxLength: 255,
      },
      ownerId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    },
  };
  static relationMappings = {
    uploader: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'media.owner_id',
        to: 'account.id',
      },
    },
    articles: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'media.id',
        through: {
          from: 'article_media.media_id',
          to: 'article_media.article_id',
        },
        to: 'article.id',
      },
    },
  };
  static listMedia(offset, limit) {
    return Media.query()
      .offset(offset)
      .limit(limit);
  }
  static getMediaById(id) {
    return Media.query().findById(id);
  }
}

export default Media;
