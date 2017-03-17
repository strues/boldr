/* @flow */
/* eslint-disable import/prefer-default-export */

export type Stats = {
  posts: Number,
  users: Number,
  tags: Number,
};

export type Post = {
  id?: string,
  feature_image?: string,
  title: string,
  slug: string,
  content: string,
  background_image?: string,
  excerpt?: string,
  created_at: string,
  updated_at?: string,
  published: ?boolean,
  author: ?User,
  tags?: Array<Tag>,
  attachments: ?Object,
  meta: ?Object,
  user_id: ?string,
};

export type PostImage = {
  created_at: string,
  file_description: ?string,
  file_name: ?string,
  file_type: string,
  id: string,
  original_name: string,
  updated_at: string,
  url: string,
  user_id: string,
};

export type Tag = {
  id: Number,
  uuid: string,
  name: string,
  description: ?string,
};

export type Page = {
  id: string,
  name: string,
  url: string,
  layout: ?Object,
  status: string,
  meta: ?Object,
  restricted: boolean,
  data: ?Object,
};

export type Block = {
  id: string,
  name: string,
  label: string,
  content: ?Object,
};

export type Setting = {
  id: Number,
  key: string,
  value: string,
  description: string,
};

export type User = {
  id: string,
  email: string,
  first_name: string,
  last_name: string,
  username: string,
  avatar_url: ?string,
  location: ?string,
  bio: ?string,
  website: ?string,
  profile_image: ?string,
  birthday: ?string,
  social: ?UserSocial,
  verified: boolean,
};

export type Facebook = {
  url: string,
};

export type Google = {
  url: string,
};

export type Twitter = {
  url: string,
};

export type Github = {
  url: string,
};

export type LinkedIn = {
  url: string,
};

export type UserSocial = {
  google: ?Google,
  facebook: ?Facebook,
  twitter: ?Twitter,
  github: ?Github,
  linkedin: ?LinkedIn,
};

export type UI = {
  drawer: boolean,
  isMobile: boolean,
  layout: string,
  loaded: boolean,
  modal: boolean,
  navbar: boolean,
};

export type Menu = {
  id: Number,
  uuid: string,
  name: string,
  safe_name: string,
  attributes: ?Object,
  restricted: ?boolean,
  details: Array<MenuDetails>,
};

export type MenuDetails = {
  id: Number,
  uuid: string,
  name: string,
  safe_name: string,
  css_classname: string,
  has_dropdown: boolean,
  order: Number,
  href: string,
  mobile_href: string,
  icon: string,
  children: Array<Object>,
};
