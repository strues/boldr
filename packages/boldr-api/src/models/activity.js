import { Model } from 'objection';
import BaseModel from './base';
// Related Model
import User from './user';
import Post from './post';
import Attachment from './attachment';
import Tag from './tag';
import MenuDetail from './menuDetail';

class Activity extends BaseModel {
  static get tableName() {
    return 'activity';
  }
  static addTimestamps = true;
  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'activity.user_id',
          to: 'user.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'activity.activity_post',
          to: 'post.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'activity.activity_user',
          to: 'user.id',
        },
      },
      attachment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attachment,
        join: {
          from: 'activity.activity_attachment',
          to: 'attachment.id',
        },
      },
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: 'activity.activity_tag',
          to: 'tag.id',
        },
      },
      menuDetail: {
        relation: Model.BelongsToOneRelation,
        modelClass: MenuDetail,
        join: {
          from: 'activity.activity_menu_detail',
          to: 'menu_detail.id',
        },
      },
    };
  }
}

export default Activity;
