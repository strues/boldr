/* @flow */

declare type GraphQLResponseRoot = {
  data?: RootQuery | RootMutation,
  errors?: Array<GraphQLResponseError>,
};

declare type GraphQLResponseError = {
  message: string, // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>,
  [propName: string]: any, // 7.2.2 says 'GraphQL servers may provide additional entries to error'
};

declare type GraphQLResponseErrorLocation = {
  line: number,
  column: number,
};

declare type RootQuery = {
  articles: ?Array<Article>,
  articlesByUser: ?Array<Article>,
  articlesByTag: ?Array<Article>,
  articleById: ?Article,
  articleBySlug: ?Article,
  attachments: ?Array<Attachment>,
  menus: ?Array<Menu>,
  menuById: ?Array<Menu>,
  listMedia: ?Array<Media>,
  mediaById: ?Media,
  mediaTypes: ?Array<MediaType>,
  settings: ?Array<Setting>,
  getTags: ?Array<Tag>,
  users: ?Array<User>,
  currentUser: ?User,
  userById: ?User,
  userByEmail: ?User,
  userByUsername: ?User,
};

/**
  An article or blog post
*/
declare type Article = {
  /** unique uuid id for the article */
  id: string,
  /** title of the article */
  title: string,
  /** slug for the article */
  slug: string,
  /** html content of the article */
  content: string,
  /** raw object of the article content */
  rawContent: ?string,
  /** show description of the article */
  excerpt: string,
  /** whether or not the article is featured */
  featured: boolean,
  /** is the article published or a draft */
  published: boolean,
  /** url of the article feature image */
  featureImage: string,
  /** url of the article background image */
  backgroundImage: ?string,
  /** the time the article was created */
  createdAt: any,
  /** the time the article was updated */
  updatedAt: ?any,
  /** the time the article was deleted */
  deletedAt: ?any,
  /** the id of the user who created the article */
  userId: string,
  /** the user who created the article */
  author: User,
  /** tags related to the article */
  tags: ?Array<Tag>,
  /** uploaded content for the article */
  media: ?Array<Media>,
};

/**
  a registered user of the site
*/
declare type User = {
  id: string,
  email: any,
  username: string,
  articles: ?Array<Article>,
  roles: ?Array<Role>,
  firstName: string,
  lastName: string,
  location: ?string,
  profileImage: ?string,
  birthday: ?any,
  bio: ?string,
  language: ?string,
  avatarUrl: any,
  website: ?any,
  socialMedia: ?Social,
};

/**
  role / permission group for users
*/
declare type Role = {
  id: string,
  name: string,
  description: ?string,
  image: ?string,
  users: ?Array<User>,
};

/**
  social media account info belonging to a user
*/
declare type Social = {
  id: string,
  userid: string,
  facebookUrl: ?any,
  twitterUrl: ?any,
  githubUrl: ?any,
  linkedinUrl: ?any,
  googleUrl: ?any,
  stackoverflowUrl: ?any,
};

/**
  tags relate content together
*/
declare type Tag = {
  id: string,
  name: string,
  description: ?string,
  articles: ?Array<Article>,
};

/**
  uploaded images, videos or audio
*/
declare type Media = {
  /** unique uuid id for the media */
  id: string,
  /** name of the media */
  fileName: string,
  /** identifier which cannot be changed */
  safeName: ?string,
  /** thumbnail filename */
  thumbName: ?string,
  /** description of the media */
  fileDescription: ?string,
  /** image, video, audio */
  mediaType: ?Array<MediaType>,
  /** mime-type */
  mimetype: ?string,
  /** accessible url */
  url: string,
  /** path to the locally stored file */
  path: ?string,
  /** owner id */
  userId: string,
  /** date the media was uploaded */
  createdAt: any,
  /** date the media was updated */
  updatedAt: ?any,
};

/**
  Category of various media
*/
declare type MediaType = {
  /** auto incrementing id */
  id: string,
  /** uuid for the media type */
  uuid: string,
  /** media type */
  mediaType: string,
  /** date the media type was created */
  createdAt: any,
  /** date the media type was updated */
  updatedAt: ?any,
};

declare type Attachment = {
  /** unique uuid id for the media */
  id: string,
  /** name of the media */
  fileName: string,
  /** identifier which cannot be changed */
  safeName: ?string,
  /** description of the media */
  fileDescription: ?string,
  /** image, video, audio */
  fileType: ?string,
  /** path to the locally stored file */
  path: ?string,
  /** url to access */
  url: ?string,
  /** owner id */
  userid: string,
  /** date the media was uploaded */
  createdAt: any,
  /** date the media was updated */
  updatedAt: ?any,
};

/**
  site navigation elements
*/
declare type Menu = {
  id: number,
  uuid: string,
  name: string,
  safeName: ?string,
  attributes: ?string,
  restricted: boolean,
  details: ?Array<MenuDetail>,
};

/**
  links and other menu content
*/
declare type MenuDetail = {
  id: number,
  uuid: string,
  safeName: string,
  name: string,
  cssClassname: ?string,
  hasDropdown: boolean,
  order: number,
  mobileHref: string,
  href: string,
  icon: string,
  children: ?any,
};

/**
  editable site settings
*/
declare type Setting = {
  id: string,
  key: string,
  value: string,
  label: ?string,
  description: ?string,
};

declare type RootMutation = {
  dummy: ?number,
  /** Sign up.
registerUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
Sign in. */
  loginUser: ?Auth,
};

/**
  Authentication type
*/
declare type Auth = {
  token: ?string,
  errors: ?Array<Error>,
};

/**
  Error type.
*/
declare type Error = {
  key: ?string,
  value: ?string,
};

declare type Subscription = {
  dummy: ?number,
};
