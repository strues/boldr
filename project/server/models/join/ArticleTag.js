import BaseModel from '../BaseModel';
import Tag from '../Tag';
import Article from '../Article';
/**
 * This is the join table connecting tags to articles.
 *
 * @see ../Tag
 * @see ../Article
 * @extends ../BaseModel
 */
class ArticleTag extends BaseModel {
  static tableName = 'article_tag';

  static addTimestamps = false;

  static idColumn = ['article_id', 'tag_id'];
  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['articleId', 'tagId'],
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
      tagId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  };
  static relationMappings = {
    tag: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Tag,
      join: {
        from: 'article_tag.tag_id',
        to: 'tag.id',
      },
    },
    article: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Article,
      join: {
        from: 'article_tag.article_id',
        to: 'article.id',
      },
    },
  };
}

export default ArticleTag;
