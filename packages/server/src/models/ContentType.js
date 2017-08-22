import BaseModel, { mergeSchemas } from './BaseModel';

class ContentT extends BaseModel {
  static tableName = 'content_type';
  static addTimestamps = true;

  static get relationMappings() {
    return {
      entities: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/Entity`,
        join: {
          from: 'content_type.id',
          to: 'entity.ctId',
        },
      },
    };
  }

  static getGontentTypes(offset, limit) {
    return ContentT.query().offset(offset).limit(limit);
  }
}

export default ContentT;
