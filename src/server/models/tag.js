import { Model } from 'boldr-orm';
import BaseModel from './base';
// Related Model
import Article from './article';

class Tag extends BaseModel {
  static get tableName() {
    return 'tag';
  }
  static addTimestamps = false;

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: {
        type: 'number',
      },
      uuid: {
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
      description: {
        type: 'string',
        maxLength: 255,
      },
    },
  };
  static get relationMappings() {
    return {
      articles: {
        relation: Model.ManyToManyRelation,
        modelClass: Article,
        join: {
          from: 'tag.id',
          through: {
            from: 'article_tag.tagId',
            to: 'article_tag.articleId',
          },
          to: 'article.id',
        },
      },
    };
  }

  static getTags(offset, limit) {
    return Tag.query().offset(offset).limit(limit);
  }
}

export default Tag;
