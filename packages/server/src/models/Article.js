import { slugIt } from '../utils';
import BaseModel, { mergeSchemas } from './BaseModel';
// Related Models
import Tag from './Tag';

class Article extends BaseModel {
  static tableName = 'article';
  // static softDelete = true;
  static addTimestamps = true;

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'slug', 'content', 'published', 'userId'],
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
      content: {
        type: 'string',
      },
      rawContent: { type: 'json' },
      published: { type: 'boolean' },
      featureImage: { type: 'string' },
      backgroundImage: { type: 'string' },
      featured: { type: 'boolean' },
      userId: { type: 'string' },
      createdAt: { type: 'date-time' },
      updatedAt: { type: 'date-time' },
      deletedAt: { type: 'date-time' },
    },
  });

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'article.userId',
          to: 'user.id',
        },
      },
      tags: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: `${__dirname}/Tag`,
        join: {
          from: 'article.id',
          through: {
            from: 'article_tag.articleId',
            to: 'article_tag.tagId',
          },
          to: 'tag.id',
        },
      },
      media: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: `${__dirname}/Media`,
        join: {
          from: 'article.id',
          through: {
            from: 'article_media.articleId',
            to: 'article_media.mediaId',
          },
          to: 'media.id',
        },
      },
    };
  }
  static getOnlyArticles(offset, limit) {
    return Article.query().offset(offset).limit(limit);
  }
  static getArticles(offset, limit) {
    return Article.query().offset(offset).limit(limit).eager('[author,tags,media]');
  }
  static getArticlesByTag(name, offset, limit) {
    return Tag.query().where({ name }).then(([tag]) => {
      return tag.$relatedQuery('articles').offset(offset).limit(limit);
    });
  }
  static getArticlesByUserId(userId) {
    return Article.query().where({ userId });
  }
  static getArticleById(id) {
    return Article.query().where({ id }).then(x => x[0]);
  }

  static getArticleBySlug(slug) {
    return Article.query().where({ slug }).eager('[tags,author,media]').then(x => x[0]);
  }
}

export default Article;
