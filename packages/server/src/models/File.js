import BaseModel from './BaseModel';
// Related Models

class File extends BaseModel {
  static tableName = 'file';
  static addTimestamps = true;

  static relationMappings = {
    owner: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Account`,
      join: {
        from: 'file.owner_id',
        to: 'account.id',
      },
    },
  };
  static listFiles(offset, limit) {
    return File.query()
      .offset(offset)
      .limit(limit);
  }
}

export default File;
