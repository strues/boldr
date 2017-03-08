import { schema } from 'normalizr';
import { page } from '../pages/schema';

const template = new schema.Entity('templates', {
  pages: [page],
}, { idAttribute: 'id' });
// const tag = new schema.Entity('tags');
const arrayOfTemplate = new schema.Array(template);

export { arrayOfTemplate, template };
