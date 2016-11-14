import { Model } from 'objection';
import Tag from '../tag/tag.model';
import Post from './post.model';

class PostTag extends Model {
  static get tableName() {
    return 'post_tag';
  }

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
