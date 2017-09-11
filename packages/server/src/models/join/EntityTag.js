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

  static addTimestamps = false;

  static get idColumn() {
    return ['entity_id', 'tag_id'];
  }

  static relationMapping = {
    tag: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Tag,
      join: {
        from: 'entity_tag.tag_id',
        to: 'tag.id',
      },
    },
    entity: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Entity,
      join: {
        from: 'entity_tag.entity_id',
        to: 'entity.id',
      },
    },
  };
}

export default EntityTag;
