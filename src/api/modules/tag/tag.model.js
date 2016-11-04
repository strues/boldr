import { Model } from 'objection';
import BaseModel from '../../core/base/BaseModel';
import Post from '../post/post.model';

class Tag extends BaseModel {
  static get tableName() {
    return 'tag';
  }
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
