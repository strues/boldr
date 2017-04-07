/**
 * UI action types
 * @type {String}
 */
export const CHANGE_LAYOUT = '@boldr/ui/CHANGE_LAYOUT';
export const MODAL_OPEN = '@boldr/ui/MODAL_OPEN';
export const MODAL_CLOSED = '@boldr/ui/MODAL_CLOSED';
export const OPEN_DRAWER = '@boldr/ui/OPEN_DRAWER';
export const CLOSE_DRAWER = '@boldr/ui/CLOSE_DRAWER';
export const SET_MOBILE_DEVICE = '@boldr/ui/SET_MOBILE_DEVICE';
export const UPDATE_MEDIA = '@boldr/ui/UPDATE_MEDIA';
export const UPDATE_DRAWER_TYPE = '@boldr/ui/UPDATE_DRAWER_TYPE';

/**
 * Auth action types
 * @type {String}
 */

export const LOGIN_REQUEST = '@boldr/auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@boldr/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@boldr/auth/LOGIN_FAILURE';

export const LOGOUT = '@boldr/auth/LOGOUT';

export const CHECK_AUTH_REQUEST = '@boldr/auth/CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = '@boldr/auth/CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILURE = '@boldr/auth/CHECK_AUTH_FAILURE';

export const SIGNUP_USER_REQUEST = '@boldr/auth/SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = '@boldr/auth/SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = '@boldr/auth/SIGNUP_USER_FAILURE';

/**
 * User action types
 * @type {String}
 */
export const FORGOT_PASSWORD_REQUEST = '@boldr/auth/FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = '@boldr/auth/FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = '@boldr/auth/FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = '@boldr/auth/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = '@boldr/auth/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = '@boldr/auth/RESET_PASSWORD_FAILURE';

export const VERIFY_ACCOUNT_REQUEST = '@boldr/auth/VERIFY_ACCOUNT_REQUEST';
export const VERIFY_ACCOUNT_SUCCESS = '@boldr/auth/VERIFY_ACCOUNT_SUCCESS';
export const VERIFY_ACCOUNT_FAILURE = '@boldr/auth/VERIFY_ACCOUNT_FAILURE';

export const FETCH_PROFILE_REQUEST = '@boldr/auth/FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = '@boldr/auth/FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = '@boldr/auth/FETCH_PROFILE_FAILURE';

export const EDIT_PROFILE_REQUEST = '@boldr/auth/EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = '@boldr/auth/EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = '@boldr/auth/EDIT_PROFILE_FAILURE';

/**
 * Attachment action types
 * @type {String}
 */

export const DELETE_ATTACHMENT_REQUEST = '@boldr/attachment/DELETE_ATTACHMENT_REQUEST';
export const DELETE_ATTACHMENT_SUCCESS = '@boldr/attachment/DELETE_ATTACHMENT_SUCCESS';
export const DELETE_ATTACHMENT_FAILURE = '@boldr/attachment/DELETE_ATTACHMENT_FAILURE';

export const GET_ATTACHMENT_REQUEST = '@boldr/attachment/GET_ATTACHMENT_REQUEST';
export const GET_ATTACHMENT_SUCCESS = '@boldr/attachment/GET_ATTACHMENT_SUCCESS';
export const GET_ATTACHMENT_FAILURE = '@boldr/attachment/GET_ATTACHMENT_FAILURE';

export const UPLOAD_ATTACHMENT_REQUEST = '@boldr/attachment/UPLOAD_ATTACHMENT_REQUEST';
export const UPLOAD_ATTACHMENT_SUCCESS = '@boldr/attachment/UPLOAD_ATTACHMENT_SUCCESS';
export const UPLOAD_ATTACHMENT_FAILURE = '@boldr/attachment/UPLOAD_ATTACHMENT_FAILURE';

export const UPLOAD_POST_IMG_REQUEST = '@boldr/attachment/UPLOAD_POST_IMG_REQUEST';
export const UPLOAD_POST_IMG_SUCCESS = '@boldr/attachment/UPLOAD_POST_IMG_SUCCESS';
export const UPLOAD_POST_IMG_FAILURE = '@boldr/attachment/UPLOAD_POST_IMG_FAILURE';

export const UPDATE_ATTACHMENT_REQUEST = '@boldr/attachment/UPDATE_ATTACHMENT_REQUEST';
export const UPDATE_ATTACHMENT_SUCCESS = '@boldr/attachment/UPDATE_ATTACHMENT_SUCCESS';
export const UPDATE_ATTACHMENT_FAILURE = '@boldr/attachment/UPDATE_ATTACHMENT_FAILURE';

export const UPLOAD_PROFILE_IMG_REQUEST = '@boldr/attachment/UPLOAD_PROFILE_IMG_REQUEST';
export const UPLOAD_PROFILE_IMG_SUCCESS = '@boldr/attachment/UPLOAD_PROFILE_IMG_SUCCESS';
export const UPLOAD_PROFILE_IMG_FAILURE = '@boldr/attachment/UPLOAD_PROFILE_IMG_FAILURE';

export const UPLOAD_AVATAR_IMG_REQUEST = '@boldr/attachment/UPLOAD_AVATAR_IMG_REQUEST';
export const UPLOAD_AVATAR_IMG_SUCCESS = '@boldr/attachment/UPLOAD_AVATAR_IMG_SUCCESS';
export const UPLOAD_AVATAR_IMG_FAILURE = '@boldr/attachment/UPLOAD_AVATAR_IMG_FAILURE';

export const SELECT_FILE = '@boldr/attachment/SELECT_FILE';

/**
 * Activities action types
 * @type {String}
 */

export const FETCH_ACTIVITY_REQUEST = '@boldr/admin/activity/FETCH_ACTIVITY_REQUEST';
export const FETCH_ACTIVITY_SUCCESS = '@boldr/admin/activity/FETCH_ACTIVITY_SUCCESS';
export const FETCH_ACTIVITY_FAILURE = '@boldr/admin/activity/FETCH_ACTIVITY_FAILURE';

export const SHOW_SIDEBAR = '@boldr/admin/SHOW_SIDEBAR';
export const HIDE_SIDEBAR = '@boldr/admin/HIDE_SIDEBAR';

export const FETCH_STATS_REQUEST = '@boldr/admin/stats/FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = '@boldr/admin/stats/FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = '@boldr/admin/stats/FETCH_STATS_FAILURE';

/**
 * Members action types
 * @type {String}
 */

export const LOAD_MEMBERS_REQUEST = '@boldr/admin/members/LOAD_MEMBERS_REQUEST';
export const LOAD_MEMBERS_SUCCESS = '@boldr/admin/members/LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_FAILURE = '@boldr/admin/members/LOAD_MEMBERS_FAILURE';
export const UPDATE_MEMBER_REQUEST = '@boldr/admin/members/UPDATE_MEMBER_REQUEST';
export const UPDATE_MEMBER_SUCCESS = '@boldr/admin/members/UPDATE_MEMBER_SUCCESS';
export const UPDATE_MEMBER_FAILURE = '@boldr/admin/members/UPDATE_MEMBER_FAILURE';
export const MEMBER_SELECTED = '@boldr/admin/members/MEMBER_SELECTED';

/**
 * Post action types
 * @type {String}
 */

export const FETCH_POSTS_REQUEST = '@boldr/blog/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = '@boldr/blog/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = '@boldr/blog/FETCH_POSTS_FAILURE';

export const FETCH_POST_REQUEST = '@boldr/blog/FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = '@boldr/blog/FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = '@boldr/blog/FETCH_POST_FAILURE';

export const UPDATE_POST_REQUEST = '@boldr/admin/posts/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = '@boldr/admin/posts/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = '@boldr/admin/posts/UPDATE_POST_FAILURE';

export const CREATE_POST_REQUEST = '@boldr/admin/posts/CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = '@boldr/admin/posts/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = '@boldr/admin/posts/CREATE_POST_FAILURE';

export const DELETE_POST_FAILURE = '@boldr/admin/posts/DELETE_POST_FAILURE';
export const DELETE_POST_REQUEST = '@boldr/admin/posts/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = '@boldr/admin/posts/DELETE_POST_SUCCESS';

export const TOGGLE_POST_LAYOUT = '@boldr/blog/TOGGLE_POST_LAYOUT';
export const SELECT_POST = '@boldr/blog/SELECT_POST';
export const SELECT_POST_SUCCESS = '@boldr/blog/SELECT_POST_SUCCESS';
export const SELECT_POST_FAILURE = '@boldr/blog/SELECT_POST_FAILURE';

export const FETCH_COMMENTS_REQUEST = '@boldr/blog/FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = '@boldr/blog/FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = '@boldr/blog/FETCH_COMMENTS_FAILURE';

export const CREATE_COMMENT_REQUEST = '@boldr/blog/CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = '@boldr/blog/CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = '@boldr/blog/CREATE_COMMENT_FAILURE';

/**
 * Tag action types
 * @type {String}
 */

export const FETCH_TAGS_REQUEST = '@boldr/blog/FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = '@boldr/blog/FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = '@boldr/blog/FETCH_TAGS_FAILURE';

export const FETCH_TAGGED_POST_REQUEST = '@boldr/blog/FETCH_TAGGED_POST_REQUEST';
export const FETCH_TAGGED_POST_SUCCESS = '@boldr/blog/FETCH_TAGGED_POST_SUCCESS';
export const FETCH_TAGGED_POST_FAILURE = '@boldr/blog/FETCH_TAGGED_POST_FAILURE';

export const ADD_TAG_REQUEST = '@boldr/blog/ADD_TAG_REQUEST';
export const ADD_TAG_SUCCESS = '@boldr/blog/ADD_TAG_SUCCESS';
export const ADD_TAG_FAILURE = '@boldr/blog/ADD_TAG_FAILURE';

export const DELETE_TAG_REQUEST = '@boldr/blog/DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = '@boldr/blog/DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = '@boldr/blog/DELETE_TAG_FAILURE';

export const SELECT_TAG = '@boldr/blog/SELECT_TAG';
export const CLEAR_TAG = '@boldr/blog/CLEAR_TAG';

/**
 * Menu action types
 * @type {String}
 */

export const GET_MAIN_MENU_REQUEST = '@boldr/menu/GET_MAIN_MENU_REQUEST';
export const GET_MAIN_MENU_SUCCESS = '@boldr/menu/GET_MAIN_MENU_SUCCESS';
export const GET_MAIN_MENU_FAILURE = '@boldr/menu/FETCH_MENUS_FAILURE';

export const UPDATE_MENU_REQUEST = '@boldr/admin/menu/UPDATE_MENU_REQUEST';
export const UPDATE_MENU_SUCCESS = '@boldr/admin/menu/UPDATE_MENU_SUCCESS';
export const UPDATE_MENU_FAILURE = '@boldr/admin/menu/UPDATE_MENU_FAILURE';

export const ADD_MENU_DETAIL_REQUEST = '@boldr/admin/menu/ADD_MENU_DETAIL_REQUEST';
export const ADD_MENU_DETAIL_SUCCESS = '@boldr/admin/menu/ADD_MENU_DETAIL_SUCCESS';
export const ADD_MENU_DETAIL_FAILURE = '@boldr/admin/menu/ADD_MENU_DETAIL_FAILURE';

/**
 * Setting action types
 * @type {String}
 */

export const FETCH_SETTINGS_REQUEST = '@boldr/settings/FETCH_SETTINGS_REQUEST';
export const FETCH_SETTINGS_SUCCESS = '@boldr/settings/FETCH_SETTINGS_SUCCESS';
export const FETCH_SETTINGS_FAILURE = '@boldr/settings/FETCH_SETTINGS_FAILURE';
export const EDIT_SETTING = '@boldr/settings/EDIT_SETTING';
export const EDIT_SETTING_SUCCESS = '@boldr/settings/EDIT_SETTING_SUCCESS';
export const EDIT_SETTING_FAILURE = '@boldr/settings/EDIT_SETTING_FAILURE';
export const UPDATE_SETTINGS_REQUEST = '@boldr/settings/UPDATE_SETTINGS_REQUEST';
export const UPDATE_SETTINGS_SUCCESS = '@boldr/settings/UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = '@boldr/settings/UPDATE_SETTINGS_FAILURE';
export const DELETE_SETTING = '@boldr/settings/DELETE_SETTING';
export const FETCH_SETTING_SUCCESS = '@boldr/settings/FETCH_SETTING_SUCCESS';

/**
 * Template action types
 * @type {String}
 */

export const FETCH_TEMPLATES_REQUEST = '@boldr/templates/FETCH_TEMPLATES_REQUEST';
export const FETCH_TEMPLATES_SUCCESS = '@boldr/templates/FETCH_TEMPLATES_SUCCESS';
export const FETCH_TEMPLATES_FAILURE = '@boldr/templates/FETCH_TEMPLATES_FAILURE';

export const FETCH_TEMPLATE_REQUEST = '@boldr/templates/FETCH_TEMPLATE_REQUEST';
export const FETCH_TEMPLATE_SUCCESS = '@boldr/templates/FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_FAILURE = '@boldr/templates/FETCH_TEMPLATE_FAILURE';

/**
 * Page action types
 * @type {String}
 */

export const FETCH_PAGES_REQUEST = '@boldr/pages/FETCH_PAGES_REQUEST';
export const FETCH_PAGES_SUCCESS = '@boldr/pages/FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = '@boldr/pages/FETCH_PAGES_FAILURE';

export const FETCH_PAGE_REQUEST = '@boldr/pages/FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = '@boldr/pages/FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = '@boldr/pages/FETCH_PAGE_FAILURE';
