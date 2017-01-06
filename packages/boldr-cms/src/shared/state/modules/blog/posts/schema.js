import { schema } from 'normalizr';
import { user } from '../../account/user/schema';

const tag = new schema.Entity('tags', {
  processStrategy: (value, parent, key) => {
    return { ...value, post: parent.id };
  },
});
const post = new schema.Entity('posts', {
  author: user,
  tags: [tag],
});

const arrayOfPost = new schema.Array(post);

export { post, arrayOfPost, tag };
