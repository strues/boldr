import { schema } from 'normalizr';

const user = new schema.Entity('users');
const attachment = new schema.Entity('attachments');

const menuDetail = new schema.Entity('details', { idAttribute: 'label' }, {
  processStrategy: (value, parent, key) => {
    return { ...value, menu: parent.label };
  },
});
const setting = new schema.Entity('settings');
const page = new schema.Entity('pages', { idAttribute: 'label' });

const menu = new schema.Entity('menus', {
  idAttribute: 'label',
  details: [menuDetail],
});

export { user, attachment, page, menu, menuDetail, setting };
