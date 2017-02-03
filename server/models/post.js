import { Model } from 'objection';

// Related Models
import Tag from './tag';
import User from './user';
import Attachment from './attachment';
import BaseModel from './base';

class Post extends BaseModel {
  static get tableName() {
    return 'post';
  }
  static addTimestamps = true;
  static hidden = ['password'];
  static get idColumn() {
    return 'id';
  }

  // static jsonSchema = {
  //   type: 'object',
  //   required: ['title', 'slug', 'content', 'excerpt', 'published'],
  //   uniqueProperties: ['slug'],
  //   additionalProperties: true,
  //   properties: {
  //     id: {
  //       type: 'string',
  //     },
  //     title: {
  //       type: 'string',
  //       minLength: 3,
  //       maxLength: 140,
  //     },
  //     slug: { type: 'string', minLength: 3, maxLength: 140 },
  //     feature_image: { type: 'string', maxLength: 255 },
  //     attachments: { type: ['object', 'null'], default: null },
  //     meta: { type: ['object', 'null'], default: null },
  //     featured: { type: 'boolean', default: false },
  //     content: { type: 'string', minLength: 3 },
  //     excerpt: { type: 'string', minLength: 3, maxLength: 255 },
  //     published: { type: 'boolean', default: true },
  //     user_id: {
  //       type: 'string',
  //     },
  //     created_at: { type: 'string', format: 'date-time' },
  //     updated_at: {
  //       type: ['string', 'null'],
  //       format: 'date-time',
  //       default: null,
  //     },
  //   },
  // };
  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'post.user_id',
          to: 'user.id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: 'post.id',
          through: {
            from: 'post_tag.post_id',
            to: 'post_tag.tag_id',
          },
          to: 'tag.id',
        },
      },
      attachments: {
        relation: Model.ManyToManyRelation,
        modelClass: Attachment,
        join: {
          from: 'post.id',
          through: {
            from: 'post_attachment.post_id',
            to: 'post_attachment.attachment_id',
          },
          to: 'attachment.id',
        },
      },
    };
  }
}

export default Post;
