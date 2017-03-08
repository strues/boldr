import { schema } from 'normalizr';
import { user } from '../../users/schema';
import { tag } from '../tags/schema';
import { comment } from '../comments/schema';

const post = new schema.Entity('posts', {
  author: user,
  tags: [tag],
  comments: [comment],
}, { idAttribute: 'slug' });

const arrayOfPost = new schema.Array(post);

export { post, arrayOfPost, comment };
