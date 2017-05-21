import { Model } from 'boldr-orm';
import BaseModel from './Base';
import MediaType from './MediaType';
import User from './User';
import Article from './Article';

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
  static listMedia(offset, limit) {
    return Media.query().offset(offset).limit(limit);
  }
  static getMediaById(id) {
    return Media.query().findById(id);
  }
}

export default Media;
