import { schema } from 'normalizr';

const userProcessStrategy = (value, parent, key) => {
  switch (key) {
    case 'author':
      return { ...value, posts: [parent.id] };
    case 'commenter':
      return { ...value, comments: [parent.id] };
    default:
      return { ...value };
  }
};

const userMergeStrategy = (entityA, entityB) => {
  return {
    ...entityA,
    ...entityB,
    posts: [...(entityA.posts || []), ...(entityB.posts || [])],
    comments: [...(entityA.comments || []), ...(entityB.comments || [])],
  };
};

const user = new schema.Entity('users', {}, {
  mergeStrategy: userMergeStrategy,
  processStrategy: userProcessStrategy,
  idAttribute: 'id',
});

const arrayOfUsers = [user];

export { user, arrayOfUsers };
