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
      image: { type: 'string' },
      heroImage: { type: 'string' },
      featured: { type: 'boolean' },
      userId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  });

  static get idColumn() {
    return 'id';
  }

  static relationMappings = {
    author: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/User`,
      join: {
        from: 'article.authorId',
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
          modelClass: `${__dirname}/join/ArticleTag`,
        },
        to: 'tag.id',
      },
    },
    category: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Category`,
      join: {
        from: 'article.categoryId',
        to: 'category.id',
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
  static getOnlyArticles(offset, limit) {
    return Article.query()
      .offset(offset)
      .limit(limit);
  }
  static getArticles(offset, limit) {
    return Article.query()
      .offset(offset)
      .limit(limit)
      .orderBy('createdAt', 'desc')
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
