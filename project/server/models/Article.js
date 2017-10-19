import BaseModel from './BaseModel';
// Related Models
import Tag from './Tag';

class Article extends BaseModel {
  static tableName = 'article';

  // static softDelete = true;
  static addTimestamps = true;

  static jsonSchema = {
    type: 'object',
    uniqueProperties: ['slug', 'title'],
    additionalProperties: ['attachments'],
    required: ['title', 'slug', 'content', 'published', 'authorId', 'categoryId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      title: {
        type: 'string',
        maxLength: 140,
      },
      slug: {
        type: 'string',
        maxLength: 140,
      },
      excerpt: {
        type: 'string',
      },
      content: {
        type: 'string',
      },
      rawContent: { type: 'json' },
      meta: { type: 'json' },
      published: {
        type: 'boolean',
        default: false,
      },
      status: {
        type: {
          enum: ['published', 'archived', 'draft'],
        },
      },
      image: {
        type: 'string',
        maxLength: 255,
      },
      heroImage: {
        type: 'string',
        maxLength: 255,
      },
      featured: {
        type: 'boolean',
        default: false,
      },
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

  static idColumn = 'id';

  static relationMappings = {
    author: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'article.author_id',
        to: 'account.id',
      },
    },
    tags: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Tag`,
      join: {
        from: 'article.id',
        through: {
          from: 'article_tag.article_id',
          to: 'article_tag.tag_id',
          modelClass: `${__dirname}/join/ArticleTag`,
        },
        to: 'tag.id',
      },
    },
    category: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Category`,
      join: {
        from: 'article.category_id',
        to: 'category.id',
      },
    },
    media: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Media`,
      join: {
        from: 'article.id',
        through: {
          from: 'article_media.article_id',
          to: 'article_media.media_id',
        },
        to: 'media.id',
      },
    },
  };

  static getOnlyArticles(offset, limit) {
    return Article.query()
      .offset(offset)
      .limit(limit);
  }

  static getArticles(offset, limit) {
    return Article.query()
      .offset(offset)
      .limit(limit)
      .orderBy('created_at', 'desc')
      .skipUndefined()
      .allowEager('[author,tags,media,category]');
  }

  static getArticlesByTag(name, offset, limit) {
    return Tag.query()
      .where({ name })
      .then(([tag]) => {
        return tag
          .$relatedQuery('articles')
          .offset(offset)
          .limit(limit);
      });
  }

  static getArticlesByUserId(userId) {
    return Article.query().where({ userId });
  }

  static getArticleById(id) {
    return Article.query()
      .where({ id })
      .then(x => x[0]);
  }

  static getArticleBySlug(slug) {
    return Article.query()
      .where({ slug })
      .eager('[tags,author,media]')
      .then(x => x[0]);
  }
}

export default Article;
