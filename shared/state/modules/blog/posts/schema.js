import { schema } from 'normalizr';
import { user } from '../../account/user/schema';
import { tag } from '../tags/schema';

const post = new schema.Entity('posts', {
  author: user,
  tags: [tag],
}, { idAttribute: 'id' });

const arrayOfPost = new schema.Array(post);

export { post, arrayOfPost };
