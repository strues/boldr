import BaseModel, { mergeSchemas } from './BaseModel';

class Entity extends BaseModel {
  static tableName = 'entity';
  static addTimestamps = true;

  static get relationMappings() {
    return {
      contentType: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/ContentType`,
        join: {
          from: 'entity.ctId',
          to: 'content_type.id',
        },
      },
      tags: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: `${__dirname}/Tag`,
        join: {
          from: 'entity.id',
          through: {
            from: 'entity_tag.entityId',
            to: 'entity_tag.tagId',
          },
          to: 'tag.id',
        },
      },
    };
  }

  static getEntities(offset, limit) {
    return Entity.query().offset(offset).limit(limit);
  }
}

export default Entity;
