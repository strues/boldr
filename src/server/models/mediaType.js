import { Model } from 'boldr-orm';
import Media from './Media';

class MediaType extends Model {
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

  static listTypes() {
    return MediaType.query();
  }
}

export default MediaType;
