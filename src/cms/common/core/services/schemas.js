import { Schema, arrayOf } from 'normalizr';

const post = new Schema('posts', { idAttribute: 'slug' });
const user = new Schema('users');
const tag = new Schema('tags');
const attachment = new Schema('attachments');
const page = new Schema('pages', { idAttribute: 'name' });
const setting = new Schema('settings', { idAttribute: 'key' });
const navigation = new Schema('navigations', { idAttribute: 'label' });
const link = new Schema('links', { idAttribute: 'label' });

post.define({
  tags: arrayOf(tag),
  author: user,
});

export { post, tag, user, attachment, page, navigation, link, setting };
