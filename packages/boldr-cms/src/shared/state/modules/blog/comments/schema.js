import { schema } from 'normalizr';
import { user } from '../../users/schema';

const comment = new schema.Entity(
  'comments',
  {
    commenter: user,
  },
  {
    processStrategy: (value, parent, key) => {
      return { ...value,
        post: parent.id };
    },
  },
  { idAttribute: 'id' },
);

const arrayOfComment = new schema.Array(comment);

export { comment, arrayOfComment };
