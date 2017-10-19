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

  static idColumn = ['entity_id', 'tag_id'];

  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['entityId', 'tagId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      entityId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      tagId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  };

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
