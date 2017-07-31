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

  static addTimestamps = true;

  static get idColumn() {
    return ['articleId', 'mediaId'];
  }

  static get relationMappings() {
    return {
      media: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Media,
        join: {
          from: 'article_media.mediaId',
          to: 'media.id',
        },
      },
      article: {
        relation: BaseModel.BelongsToOneRelation,
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
