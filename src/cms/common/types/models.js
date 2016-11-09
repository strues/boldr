/* @flow */
/* eslint-disable import/prefer-default-export */

export type Post = {
  id?: String,
  feature_image?: String,
  title?: String,
  slug?: String,
  content?: String,
  background_image?: String,
  excerpt?: String,
  created_at?: String,
  updated_at?: String,
  status?: String,
  author?: User,
  seo?: Object,
  tags?: Array<Tag>
};

export type Tag = {
  id: Number,
  uuid: String,
  name: String,
  description: String
};

export type Page = {
  id: String,
  name: String,
  url: String,
  layout: ?Object,
  status: String,
  meta: ?Object,
  restricted: Boolean,
  data: ?Object
}

export type Block = {
  id: String,
  name: String,
  label: String,
  content: ?Object
}

export type Setting = {
  id: Number,
  key: String,
  value: String,
  description: String
};

export type User = {
  id: String,
  email: String,
  first_name: String,
  last_name: String,
  display_name: String,
  avatar_url: ?String,
  location: ?String,
  bio: ?String,
  website: ?String,
  profile_image: ?String,
  birthday: ?String,
  facebook_profile: ?String,
  linkedin_profile: ?String,
  github_profile: ?String,
  google_profile: ?String,
  twitter_profile: ?String,
  verified: Boolean
};
