import { Model } from 'objection';
import BaseModel from './base';
import MediaType from './mediaType';
import User from './user';
import Article from './article';

class Media extends BaseModel {
  static get tableName() {
    return 'media';
  }
  static addTimestamps = true;

  static get relationMappings() {
    return {
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: MediaType,
        join: {
          from: 'media.mediaType',
          to: 'media_type.id',
        },
      },
      uploader: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'media.userId',
          to: 'user.id',
        },
      },
      articles: {
        relation: Model.ManyToManyRelation,
        modelClass: Article,
        join: {
          from: 'media.id',
          through: {
            from: 'article_media.mediaId',
            to: 'article_media.articleId',
          },
          to: 'article.id',
        },
      },
    };
  }
}

export default Media;
