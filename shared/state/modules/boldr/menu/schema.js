import { normalize, schema } from 'normalizr';

const detail = new schema.Entity('details', { idAttribute: 'id' });
const menu = new schema.Entity('menus', {
  details: [detail],
}, { idAttribute: 'id' });

export { detail, menu };
