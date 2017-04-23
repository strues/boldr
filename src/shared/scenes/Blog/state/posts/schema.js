import { schema } from 'normalizr';
import { user } from '../../../../state/modules/users/schema';
import { tag } from '../tags/schema';

const post = new schema.Entity(
  'posts',
  {
    author: user,
    tags: [tag],
  },
  { idAttribute: 'slug' },
);

const arrayOfPost = new schema.Array(post);

export { post, arrayOfPost };
