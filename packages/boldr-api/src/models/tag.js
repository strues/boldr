import { Model } from 'objection';
import BaseModel from './base';
// Related Model
import Post from './post';

class Tag extends BaseModel {
  static get tableName() {
    return 'tag';
  }
  static addTimestamps = false;

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: {
        type: 'number',
      },
      uuid: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 64,
        pattern: '^[A-Za-z0-9-_]+$',
      },
      description: {
        type: 'string',
        maxLength: 255,
      },
    },
  };
  static get relationMappings() {
    return {
      posts: {
        relation: Model.ManyToManyRelation,
        modelClass: Post,
        join: {
          from: 'tag.id',
          through: {
            from: 'post_tag.tag_id',
            to: 'post_tag.post_id',
          },
          to: 'post.id',
        },
      },
    };
  }
}

export default Tag;
