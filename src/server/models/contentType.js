import { Model } from 'objection';
import BaseModel from './base';
import Block from './block';

class ContentType extends BaseModel {
  static get tableName() {
    return 'content_type';
  }
  static addTimestamps = true;
  static get softDelete() {
    return true;
  }
  static get relationMappings() {
    return {
      blocks: {
        relation: Model.HasManyRelation,
        modelClass: Block,
        join: {
          from: 'content_type.id',
          to: 'block.id',
        },
      },
    };
  }
}

export default ContentType;
