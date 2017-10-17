import slugIt from '@boldr/utils/lib/strings/slugIt';
import BaseModel from './BaseModel';

class Tag extends BaseModel {
  static tableName = 'tag';
  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    uniqueProperties: ['name'],
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
        maxLength: 32,
        pattern: '^[A-Za-z0-9-_]+$',
      },
      safeName: {
        type: 'string',
        minLength: 3,
        maxLength: 32,
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
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'tag.id',
        through: {
          from: 'article_tag.tag_id',
          to: 'article_tag.article_id',
          modelClass: `${__dirname}/join/ArticleTag`,
        },
        to: 'article.id',
      },
    },
    entities: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Entity`,
      join: {
        from: 'tag.id',
        through: {
          from: 'entity_tag.tag_id',
          to: 'entity_tag.entity_id',
          modelClass: `${__dirname}/join/EntityTag`,
        },
        to: 'entity.id',
      },
    },
  };
  $beforeUpdate(queryContext) {
    super.$beforeUpdate(queryContext);

    if (this.hasOwnProperty('name')) {
      this.safeName = slugIt(this.name);
    }
  }
  /**
   * Before inserting make sure we hash the password if provided.
   *
   * @param {object} queryContext
   */
  $beforeInsert(queryContext) {
    super.$beforeInsert(queryContext);

    if (this.hasOwnProperty('name')) {
      this.safeName = slugIt(this.name);
    }
  }
  static getTags(offset, limit) {
    return Tag.query()
      .offset(offset)
      .limit(limit);
  }
}

export default Tag;
