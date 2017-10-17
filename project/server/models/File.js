import BaseModel from './BaseModel';
// Related Models

class File extends BaseModel {
  static tableName = 'file';
  static addTimestamps = true;
  static jsonSchema = {
    type: 'object',
    required: ['name', 'safeName', 'path', 'url', 'type'],
    uniqueProperties: ['name', 'safeName'],
    additionalProperties: false,
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 128,
        pattern: '^[A-Za-z0-9-_]+$',
      },
      safeName: {
        type: 'string',
        minLength: 3,
        maxLength: 128,
      },
      thumbName: {
        type: 'string',
        minLength: 3,
        maxLength: 128,
      },
      size: {
        type: 'number',
      },
      fileDescription: {
        type: 'string',
        minLength: 3,
      },
      type: {
        type: 'string',
        maxLength: 32,
      },
      url: {
        type: 'string',
        maxLength: 125,
      },
      path: {
        type: 'string',
        maxLength: 255,
      },
      ownerId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    },
  };
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
