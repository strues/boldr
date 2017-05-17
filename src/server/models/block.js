import { Model } from 'objection';
import BaseModel from './base';
import ContentType from './contentType';

class Block extends BaseModel {
  static get tableName() {
    return 'block';
  }
  static addTimestamps = true;
  static get softDelete() {
    return true;
  }
  static get relationMappings() {
    return {
      contentType: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContentType,
        join: {
          from: 'block.id',
          to: 'content_type.id',
        },
      },
      children: {
        relation: Model.ManyToManyRelation,
        modelClass: Block,
        join: {
          from: 'block.id',
          through: {
            from: 'block_relation.parentId',
            to: 'block_relation.childId',
          },
          to: 'block.id',
        },
      },
      parents: {
        relation: Model.ManyToManyRelation,
        modelClass: Block,
        join: {
          from: 'block.id',
          through: {
            from: 'block_relation.parentId',
            to: 'block_relation.childId',
          },
          to: 'block.id',
        },
      },
    };
  }
}

export default Block;
