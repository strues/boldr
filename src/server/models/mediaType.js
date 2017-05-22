import { Model } from 'objection';
import Media from './Media';

import BaseModel from './Base';

class MediaType extends BaseModel {
  static tableName = 'media_type';
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

  static listTypes() {
    return MediaType.query();
  }
}

export default MediaType;
