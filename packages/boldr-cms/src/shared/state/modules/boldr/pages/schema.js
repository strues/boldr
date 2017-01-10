import { schema } from 'normalizr';

const page = new schema.Entity('pages', {
  processStrategy: (value, parent, key) => {
    return { ...value, template: parent.id };
  },
});
// const tag = new schema.Entity('tags');
const arrayOfPage = new schema.Array(page);

export { arrayOfPage, page };
