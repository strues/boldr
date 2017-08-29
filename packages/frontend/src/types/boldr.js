/* eslint-disable */
/* @flow */

import * as React from 'react';

export type NavRoute = {
  component: Function | ?React.Node,
  breadcrumb?: string | ?React.Node,
  exact?: boolean,
  path: string,
  routes?: Array<?NavRoute>,
};

export type FluxStandardAction = {
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean,
};
export type FlattenedRoutes = Array<NavRoute>;
export type Reducer = (state: ?Object, action: FluxStandardAction) => Object;

export type Params = { [string]: string | number };

export type RouterLocation = {
  pathname?: string,
  search?: string,
  hash?: string,
  state?: any,
};
export type MatchPath = {
  path: string,
  exact?: boolean,
  strict?: boolean,
};

export type MatchParams = {
  path: string,
  exact?: boolean,
  strict?: boolean,
  params: Params,
};

export type AuthToken = {
  issuer: string,
  subject: string,
  jti: string,
  iat: number,
  expiresIn: string | number,
  email: string,
  role: string,
};

export interface RawContent {
  blocks: Array<Object>,
  entityMap: Object,
}

export type Article = {
  // Unique identifier for the object.
  id: string,

  // The title of the article
  title: string,

  // An alphanumeric identifier for the object unique to its type.
  slug: string,

  // html content of the article
  content: string,

  // Raw JSON of the article
  rawContent: RawContent,

  // Short description of the article
  excerpt?: string,

  // True if the article is featured
  featured?: boolean,

  // True if the article is published
  published: boolean,

  // url of the article feature image
  image: string,

  userId?: string,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,

  // Tags relating articles together
  tags: Array<Tag>,

  // Media uploaded with the article
  media?: Array<Media>,

  // Users belonging to a role.
  author: User,
};
export type ArticlesType = Array<Article>;
export type ArticleType = Article;

export type Media = {
  // Unique identifier for the object.
  id: string,

  // A name for the object.
  name: string,

  // A normalized copy of the object name.
  safeName: string,

  // thumbnail filename
  thumbName: string,

  // The description of the upload
  fileDescription?: string,

  // The mime-type of the upload
  type: string,

  // The size of the upload
  size: number,

  // The local path where the file is stored
  path: string,

  // The relative url to access the file
  url: string,

  // The id of the user the file belongs to.
  userId: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type MediaType = Media;
export type MediasType = Array<Media>;

export type Tag = {
  // Unique identifier for the object.
  id: string,

  // A name for the object.
  name: string,

  // A description of the tag
  description?: string,

  // Articles related to the tag
  articles?: ArticleType,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type TagsType = Array<Tag>;
export type TagType = Tag;

export type User = {
  // Unique identifier for the object.
  id: string,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,

  // The user email
  email: string,

  // The username of the user
  username: string,

  // true if email is verified, false otherwise
  verified: boolean,

  // The website of the user
  website?: string,

  // The first name of the user
  firstName: string,

  // The last name associated with the user
  lastName?: string,

  // Information about the user
  bio?: string,

  // url of user's avatar picture
  avatarUrl?: string,

  // Url for the user's profile background image
  profileImage?: string,

  // Location the user lives
  location?: string,

  // Language the user prefers
  language?: string,

  // When the user was born
  birthday?: string,

  // Roles the user belongs to.
  roles: Array<Role>,

  // Social media profiles of the user.
  socialMedia?: Social,

  // Articles the user has written
  articles?: ArticleType,

  // Articles the user has written
  uploads?: Array<Media>,

  // Account verification token belonging to the user.
  verificationToken?: VerificationToken,

  // Password reset token belonging to the user.
  resetToken?: ResetToken,
};

export type UserType = User;
export type UsersType = Array<User>;

export type Social = {
  // Unique identifier for the object.
  id: string,

  // The unique identifier for the user for the identity.
  userId?: string,

  // The Facebook profile url for the user.
  facebookUrl?: string,

  // The Twitter profile url for the user.
  twitterUrl?: string,

  // The Google profile url for the user.
  googleUrl?: string,

  // The GitHub profile url for the user.
  githubUrl?: string,

  // The LinkedIn profile url for the user.
  linkedinUrl?: string,

  // The Stackoverflow profile url for the user.
  stackoverflowUrl?: string,
};

export type VerificationToken = {
  // Unique identifier for the object.
  id: string,

  // The ip address of the person performing the reset
  ip?: string,

  // The reset token
  token: string,

  // True if the token has been used before.
  used: boolean,

  // The id of the user the token belongs to
  userId: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type Setting = {
  // Unique identifier for the object.
  id: string,

  // The setting option
  key: string,

  // The value of the setting
  value: string,

  // A non-normalized key
  label: string,

  // The description for what the setting does.
  description: string,
};
export type SettingType = Setting;
export type SettingsType = Array<Setting>;
export type ResetToken = {
  // Unique identifier for the object.
  id: string,

  // The ip address of the person performing the reset
  ip: string,

  // The reset token
  token: string,

  // True if the token has been used before.
  used: boolean,

  // The user id owning the token
  userId: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type Role = {
  // Unique identifier for the object.
  id: string,

  // A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity.
  uuid: string,

  // A name for the object.
  name: string,

  // An image for role identification
  image?: string,

  // The role description
  description: string,

  // Users belonging to a role.
  users?: Array<User>,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

// Navigation for the site
export type Menu = {
  // Unique identifier for the object.
  id: string,

  // A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity.
  uuid: string,

  // A name for the object.
  name: string,

  // Custom css classname for the link
  attributes?: string,

  // True if the menu should be hidden from unauth
  restricted: boolean,

  // Links
  details: Array<MenuDetail>,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};
export type DetailChild = {
  href: string,
  icon?: string,
  id: string,
  safeName: string,
  title: string,
};
export type MenuDetailChildren = {
  items: Array<DetailChild>,
  key: string,
};
// links and other menu content
export type MenuDetail = {
  // Unique identifier for the object.
  id: string,

  // The title text for the menu link
  title: string,

  // A normalized copy of the object name.
  safeName: string,

  // Custom css classname for the link
  cssClassname?: string,

  // True if the item has a dropdown
  hasDropdown: boolean,

  // The display order
  order: number,

  // Mobile only link
  mobileHref?: string,

  // The link
  href: string,

  // Icon kind
  icon?: string,

  // Children are dropdown links
  children: MenuDetailChildren,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type CurrentUser = {
  // Unique identifier for the object.
  id: string,
  // The user email
  email: string,
  // The username of the user
  username: string,
  // The website of the user
  website?: string,
  // The first name of the user
  firstName: string,
  // The last name associated with the user
  lastName: string,
  // Information about the user
  bio?: string,
  // url of user's avatar picture
  avatarUrl: string,
  // Url for the user's profile background image
  profileImage?: string,
  // Location the user lives
  location?: string,
  // Roles the user belongs to.
  roles: string,
  roleId: number,
  // Social media profiles of the user.
  socialMedia: Social,
};
