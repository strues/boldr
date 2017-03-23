import { Model } from 'objection';
import Tag from '../tag';
import Post from '../post';
import BaseModel from '../base';

/**
 * This is the join table connecting tags to posts.
 *
 * @see ../Tag
 * @see ../Post
 * @extends ../BaseModel
 */
class PostTag extends BaseModel {
  static get tableName() {
    return 'post_tag';
  }

  static addTimestamps = false;

  static get idColumn() {
    return ['post_id', 'tag_id'];
  }

  static get relationMappings() {
    return {
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tag,
        join: {
          from: 'post_tag.tag_id',
          to: 'tag.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'post_tag.post_id',
          to: 'post.id',
        },
      },
    };
  }
}

export default PostTag;
