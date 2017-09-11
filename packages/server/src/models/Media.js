import BaseModel from './BaseModel';

class Media extends BaseModel {
  static tableName = 'media';
  static addTimestamps = true;

  static relationMappings = {
    uploader: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'media.owner_id',
        to: 'account.id',
      },
    },
    articles: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'media.id',
        through: {
          from: 'article_media.media_id',
          to: 'article_media.article_id',
        },
        to: 'article.id',
      },
    },
  };
  static listMedia(offset, limit) {
    return Media.query()
      .offset(offset)
      .limit(limit);
  }
  static getMediaById(id) {
    return Media.query().findById(id);
  }
}

export default Media;
