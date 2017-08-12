import BaseModel from './BaseModel';

class Media extends BaseModel {
  static tableName = 'media';
  static addTimestamps = true;

  static get relationMappings() {
    return {
      uploader: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'media.userId',
          to: 'user.id',
        },
      },
      articles: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: `${__dirname}/Article`,
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
