import { normalize, schema } from 'normalizr';

const detail = new schema.Entity('details');
const menu = new schema.Entity('menus', {
  details: [detail],
});

export { detail, menu };
