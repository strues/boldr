// This is the prefix for all of our API requests.
// You can leave as-is and the proxy will take care of everything
// If you change this value, the value in the server proxy will need to be changed
export const API_PREFIX = '/api/v1';

export const S3_SIGNING_URL = '/s3/sign';
// Define all endpoints for easy imports and modifications.
export const API_AUTH = `${API_PREFIX}/auth`;
export const API_BLOCKS = `${API_PREFIX}/blocks`;
export const API_POSTS = `${API_PREFIX}/posts`;
export const API_ACTIVITY = `${API_PREFIX}/activities`;
export const API_USERS = `${API_PREFIX}/users`;
export const API_PROFILES = `${API_PREFIX}/profiles}`;
export const API_PAGES = `${API_PREFIX}/pages`;
export const API_LINKS = `${API_PREFIX}/links`;
export const API_ATTACHMENTS = `${API_PREFIX}/attachments`;
export const API_TAGS = `${API_PREFIX}/tags`;
export const API_SETTINGS = `${API_PREFIX}/settings`;
export const API_NAVIGATION = `${API_PREFIX}/navigations`;
export const API_TOKEN = `${API_PREFIX}/tokens`;
