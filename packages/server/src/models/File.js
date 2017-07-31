import BaseModel, { mergeSchemas } from './BaseModel';
// Related Models

class File extends BaseModel {
  static tableName = 'file';
  static addTimestamps = true;
  static get relationMappings() {
    return {
      owner: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'file.ownerId',
          to: 'user.id',
        },
      },
    };
  }
  static listFiles(offset, limit) {
    return File.query().offset(offset).limit(limit);
  }
}

export default File;
