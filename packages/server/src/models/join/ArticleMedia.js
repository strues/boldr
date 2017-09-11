import BaseModel from '../BaseModel';
import Media from '../Media';
import Article from '../Article';
/**
 * This is the join table connecting media to articles.
 *
 * @see ../Media
 * @see ../Article
 * @extends ../BaseModel
 */
class ArticleMedia extends BaseModel {
  static tableName = 'article_media';

  static addTimestamps = false;

  static get idColumn() {
    return ['article_id', 'media_id'];
  }

  static get relationMappings() {
    return {
      media: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Media,
        join: {
          from: 'article_media.media_id',
          to: 'media.id',
        },
      },
      article: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Article,
        join: {
          from: 'article_media.article_id',
          to: 'article.id',
        },
      },
    };
  }
}

export default ArticleMedia;
