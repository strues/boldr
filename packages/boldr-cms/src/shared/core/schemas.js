import { Schema, arrayOf } from 'normalizr';

const post = new Schema('posts', { idAttribute: 'slug'});
const user = new Schema('users', { idAttribute: 'id' });
const tag = new Schema('tags', { idAttribute: 'id' });
const attachment = new Schema('attachments');
const page = new Schema('pages', { idAttribute: 'label' });
const setting = new Schema('settings', { idAttribute: 'key' });
const menu = new Schema('menus', { idAttribute: 'label' });
const menuDetail = new Schema('details', { idAttribute: 'label' });

post.define({
  tags: arrayOf(tag),
  author: user,
});

// menu.define({
//   details: arrayOf(menuDetail),
// });

export { post, tag, user, attachment, page, menu, menuDetail, setting };
