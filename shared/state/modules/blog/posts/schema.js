import { schema } from 'normalizr';
import { user } from '../../account/user/schema';
import { tag } from '../tags/schema';

const comment = new schema.Entity('comments', {
  commenter: user,
}, {
  processStrategy: (value, parent, key) => {
    return { ...value, post: parent.id };
  } }, { idAttribute: 'id' });

const post = new schema.Entity('posts', {
  author: user,
  tags: [tag],
  comments: [comment],
}, { idAttribute: 'id' });

const arrayOfPost = new schema.Array(post);

export { post, arrayOfPost, comment };
