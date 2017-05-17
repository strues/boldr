import { Model } from 'objection';
import BaseModel from './base';
import Media from './media';

class MediaType extends BaseModel {
  static get tableName() {
    return 'media_type';
  }
  static addTimestamps = true;

  static get relationMappings() {
    return {
      files: {
        relation: Model.HasManyRelation,
        modelClass: Media,
        join: {
          from: 'media_type.id',
          to: 'media.mediaType',
        },
      },
    };
  }
}

export default MediaType;
