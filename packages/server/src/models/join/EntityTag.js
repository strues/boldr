import BaseModel from '../BaseModel';
import Tag from '../Tag';
import Entity from '../Entity';
/**
 * This is the join table connecting tags to entities.
 *
 * @see ../Tag
 * @see ../Entity
 * @extends ../BaseModel
 */
class EntityTag extends BaseModel {
  static tableName = 'entity_tag';

  static addTimestamps = true;

  static get idColumn() {
    return ['entityId', 'tagId'];
  }

  static get relationMappings() {
    return {
      tag: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: 'entity_tag.tagId',
          to: 'tag.id',
        },
      },
      entity: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Entity,
        join: {
          from: 'entity_tag.entityId',
          to: 'entity.id',
        },
      },
    };
  }
}

export default EntityTag;
