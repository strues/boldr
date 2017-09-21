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
export type UUID = string;
export type Params = { [string]: string | number };

export type RouterLocation = {
  pathname: string,
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

type Account = {
  // Unique identifier for the object.
  id: UUID,
  // Email address belonging to the account
  email: string,
  // true if email is verified, false otherwise
  verified: boolean,
  // The ip address of the person performing the reset
  ip?: string,
  // The reset token
  resetToken?: string,
  // When the token expires.
  resetTokenExp?: string,
  // The account verification token
  verificationToken?: string,
  // When the verification expires.
  verificationTokenExp?: string,
  // When the account was last logged in to.
  lastLogin?: string,
  // The timestamp when the object was deleted
  deletedAt?: string,
  // The timestamp when the object was last updated
  updatedAt?: string,
  // The timestamp when the object was created
  createdAt?: string,
  // Roles the account belongs to.
  roles: RolesType,
  // Profile belonging to the account.
  profile: ProfileType,
  // Articles the user has written
  articles?: ArticlesType,
  // Articles the user has written
  uploads?: MediasType,
};

export type AccountType = Account;
export type AccountsType = Array<Account>;

type Profile = {
  // Unique identifier for the object.
  id: UUID,
  // The id of the account the profile belongs to.
  accountId: UUID,
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
  // The url for an avatar
  avatarUrl: string,
  // A url for an image to use as a profile background.
  profileImage?: string,
  // Where the user lives
  location?: string,
  // Language the user prefers
  language?: string,
  // When the user was born
  birthday?: string,
  // The timestamp when the object was deleted
  deletedAt?: string,
  // The timestamp when the object was last updated
  updatedAt?: string,
  // The timestamp when the object was created
  createdAt?: string,
  // Social media profiles.
  socialMedia?: Social,
};

export type ProfileType = Profile;
export type ProfilesType = Array<Profile>;

type Article = {
  // Unique identifier for the object.
  id: UUID,
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
  // The publishing status of content
  status: Status,
  // url of the article feature image
  image: string,
  // url of the article hero image
  heroImage?: string,
  categoryId?: string,
  authorId?: string,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,

  // Tags relating articles together
  tags?: TagsType,

  // Media uploaded with the article
  media?: MediasType,

  // Users belonging to a role.
  author: AccountType,
};

export type ArticlesType = Array<Article>;
export type ArticleType = Article;

// A category groups content together
type Category = {
  // Unique identifier for the object.
  id: UUID,

  // A name for the object.
  name: string,
  // An alphanumeric identifier for the object unique to its type.
  slug: string,

  // An icon to use for the category
  icon?: string,

  // A description of the category
  description?: string,

  // Entities belonging to the category
  entities?: EntitiesType,

  // Articles belonging to the category
  articles?: ArticlesType,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type CategoryType = Category;
export type CategoriesType = Array<Category>;

type Media = {
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
  ownerId: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type MediaType = Media;
export type MediasType = Array<Media>;

type Entity = {
  // Unique identifier for the object.
  id: UUID,

  // The title of the entity
  title: string,

  // An alphanumeric identifier for the object unique to its type.
  slug: string,

  // html content of the entity
  content: string,

  // Raw JSON of the entity
  rawContent: RawContent,

  // Short description of the entity
  excerpt?: string,
  meta?: Object,

  // The publish status of content
  status: Status,

  // url of the entity main image
  image?: string,

  // The id of the creator
  authorId?: UUID,

  // The content type id
  ctId?: UUID,

  // The category id
  categoryId?: UUID,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,

  // Tags relating articles together
  tags?: TagsType,
  contentType?: ContentType,
  category?: CategoryType,

  // User who created the entity.
  author?: AccountType,
};

export type EntityType = Entity;
export type EntitiesType = Array<EntityType>;
// Variations of status for content
export type Status = 'published' | 'archived' | 'draft';

// A tag relates content together
type ContentType = {
  // Unique identifier for the object.
  id: UUID,

  // A name for the object.
  name: string,

  // An alphanumeric identifier for the object unique to its type.
  slug: string,

  // An icon to use for the content type
  icon?: string,

  // A description of the tag
  description?: string,

  // entities related to the content type
  entities?: EntitiesType,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type ContentTypeType = ContentType;
export type ContentTypes = Array<ContentType>;

type Tag = {
  // Unique identifier for the object.
  id: UUID,

  // A name for the object.
  name: string,

  // A description of the tag
  safeName?: string,

  // Articles related to the tag
  articles?: ArticlesType,
  entities?: EntitiesType,
  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type TagsType = Array<Tag>;
export type TagType = Tag;

type Social = {
  // Unique identifier for the object.
  id: UUID,

  // The id of the profile the social media accounts belong to.
  profileId?: UUID,

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

type Setting = {
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

type Role = {
  // Unique identifier for the object.
  id: number,

  // A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity.
  uuid: string,

  // A name for the object.
  name: string,

  // An image for role identification
  image?: string,

  // The role description
  description: string,

  // Users belonging to a role.
  accounts?: AccountsType,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type RoleType = Role;
export type RolesType = Array<Role>;

// Navigation for the site
type Menu = {
  // Unique identifier for the object.
  id: number,

  // A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity.
  uuid?: string,

  // A name for the object.
  name: string,

  // True if the menu should be hidden from unauth
  restricted: boolean,

  // Links
  details: Array<MenuDetail>,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type MenuType = Menu;
export type MenusType = Array<Menu>;

// links and other menu content
type MenuDetail = {
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
  isDropdown: boolean,
  // The display order
  order: number,
  menuId: number,
  parentId?: UUID,
  // The link
  href: string,

  // Icon kind
  icon?: string,

  // The timestamp when the object was deleted
  deletedAt?: string,

  // The timestamp when the object was last updated
  updatedAt?: string,

  // The timestamp when the object was created
  createdAt?: string,
};

export type MenuDetailType = MenuDetail;
export type MenuDetailsType = Array<MenuDetail>;

export type CurrentUser = {
  // Unique identifier for the object.
  id: UUID,
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
export type AccountLoginResponse = {
  // The JSONWebToken for the user.
  token: string,
  // The user who logged in.
  account: AccountType,
  // Any auth related errors.
  errors?: ErrorsType,
};

export type AuthInput = {
  // The email address for the account to create or login to.
  email: string,
  // The password belonging to the account.
  password: string,
};

type Error = {
  // HTTP status code
  code?: number,
  // The error message
  message?: string,
};

export type ErrorType = Error;
export type ErrorsType = Array<Error>;

export type ContentRoot = {
  tags: TagsType,
  categories: CategoriesType,
  contentTypes: ContentTypes,
};
