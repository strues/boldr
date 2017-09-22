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

  static idColumn = ['article_id', 'media_id'];
  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['articleId', 'mediaId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      articleId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      mediaId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  };
  static relationMappings = {
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

export default ArticleMedia;
