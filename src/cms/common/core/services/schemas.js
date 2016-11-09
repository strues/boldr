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

export const Schemas = {
  USER: user,
  USER_ARRAY: arrayOf(user),
  POST: post,
  POST_ARRAY: arrayOf(post),
  TAG: tag,
  TAG_ARRAY: arrayOf(tag),
  SETTING: setting,
  SETTING_ARRAY: arrayOf(setting),
  NAVIGATION: navigation,
  NAVIGATION_ARRY: arrayOf(navigation),
  LINK: link,
  LINK_ARRAY: arrayOf(link),
  ATTACHMENT: attachment,
  ATTACHMENT_ARRAY: arrayOf(attachment),
  PAGE: page,
  PAGE_ARRAY: arrayOf(page),
};

export { post, tag, user, attachment, page, navigation, link, setting };
