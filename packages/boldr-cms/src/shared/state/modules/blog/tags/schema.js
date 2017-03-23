import { schema } from 'normalizr';

const tag = new schema.Entity(
  'tags',
  {
    processStrategy: (value, parent, key) => {
      return { ...value,
        post: parent.id };
    },
  },
  { idAttribute: 'id' },
);
// const tag = new schema.Entity('tags');
const arrayOfTag = new schema.Array(tag);

export { arrayOfTag, tag };
