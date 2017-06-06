const DASHBORAD = '/admin';
const about = () => '/about';
const login = () => '/login';
const signUp = () => '/signUp';
const forgot = () => '/account/forgot-password';
const reset = token => `/account/reset-password/${token}`;
const verify = token => `/account/verify/${token}`;
const preferences = () => '/account/preferences';
const profile = username => `/profiles/${username}`;
const blog = () => '/blog';
const article = slug => `/blog/${slug}`;
const tags = name => `/blog/tags/${name}`;
const dash = () => `${DASHBORAD}/dashboard`;
const content = () => `${DASHBORAD}/content`;
const articles = () => `${DASHBORAD}/content/articles`;
const editArticle = slug => `${DASHBORAD}/content/articles/${slug}`;
const newArticle = () => `${DASHBORAD}/content/articles/new`;
const listTags = () => `${DASHBORAD}/content/tags`;
const editTag = name => `${DASHBORAD}/content/tags/${name}`;
const fileManager = () => `${DASHBORAD}/filemanager`;
const fileEditor = id => `${DASHBORAD}/filemanager/${id}`;
const navigation = () => `${DASHBORAD}/navigation`;
const members = () => `${DASHBORAD}/members`;
const settings = () => `${DASHBORAD}/settings`;
const media = () => `${DASHBOARD}/media`;
const mediaUpload = () => `${DASHBORAD}/media/upload`;
const mediaEdit = id => `${DASHBORAD}/media/${id}`;

export default {
  login,
  signUp,
  blog,
  article,
  forgot,
  reset,
  verify,
  preferences,
  profile,
  tags,
  dash,
  content,
  articles,
  editArticle,
  newArticle,
  listTags,
  editTag,
  fileManager,
  fileEditor,
  navigation,
  members,
  settings,
  media,
  mediaUpload,
  mediaEdit,
};
