import { Model } from 'boldr-orm';
import { slugIt } from '../utils';

// Related Models
import Tag from './Tag';
import User from './User';
import Attachment from './Attachment';
import Media from './Media';

class Article extends Model {
  static tableName = 'article';
  static softDelete = true;
  static addTimestamps = true;
  static hidden = ['password'];
  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'article.userId',
          to: 'user.id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
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
        relation: Model.ManyToManyRelation,
        modelClass: Media,
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
    return Article.query()
      .offset(offset)
      .limit(limit)
      .eager('[author,tags,media]');
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
    return Article.query()
      .where({ slug })
      .eager('[tags,author,media]')
      .then(x => x[0]);
  }
}

export default Article;
