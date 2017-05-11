import { schema } from 'normalizr';

const userProcessStrategy = (value, parent, key) => {
  switch (key) {
    case 'author':
      return {
        ...value,
        articles: [parent.id],
      };
    default:
      return { ...value };
  }
};

const userMergeStrategy = (entityA, entityB) => {
  return {
    ...entityA,
    ...entityB,
    articles: [...(entityA.articles || []), ...(entityB.articles || [])],
  };
};

const user = new schema.Entity(
  'users',
  {},
  {
    mergeStrategy: userMergeStrategy,
    processStrategy: userProcessStrategy,
    idAttribute: 'id',
  },
);

const arrayOfUsers = [user];

export { user, arrayOfUsers };
