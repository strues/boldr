import { Model } from 'objection';
import Media from '../media';
import Article from '../article';
import BaseModel from '../base';

/**
 * This is the join table connecting media to articles.
 *
 * @see ../Media
 * @see ../Article
 * @extends ../BaseModel
 */
class ArticleMedia extends BaseModel {
  static get tableName() {
    return 'article_media';
  }

  static addTimestamps = false;

  static get idColumn() {
    return ['articleId', 'mediaId'];
  }

  static get relationMappings() {
    return {
      media: {
        relation: Model.BelongsToOneRelation,
        modelClass: Media,
        join: {
          from: 'article_media.mediaId',
          to: 'media.id',
        },
      },
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: Article,
        join: {
          from: 'article_media.articleId',
          to: 'article.id',
        },
      },
    };
  }
}

export default ArticleMedia;
