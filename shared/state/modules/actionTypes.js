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
 * Account action types
 * @type {String}
 */

export const LOGIN_REQUEST = '@boldr/auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@boldr/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@boldr/auth/LOGIN_FAILURE';

export const LOGOUT_USER = '@boldr/auth/LOGOUT_USER';
export const LOGOUT_USER_FAIL = '@boldr/auth/LOGOUT_USER_FAIL';

export const CHECK_AUTH_REQUEST = '@boldr/auth/CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = '@boldr/auth/CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILURE = '@boldr/auth/CHECK_AUTH_FAILURE';

export const SIGNUP_USER_REQUEST = '@boldr/auth/SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = '@boldr/auth/SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = '@boldr/auth/SIGNUP_USER_FAILURE';

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

// Attachments
export const DELETE_ATTACHMENT_REQUEST = 'DELETE_ATTACHMENT_REQUEST';
export const DELETE_ATTACHMENT_SUCCESS = 'DELETE_ATTACHMENT_SUCCESS';
export const DELETE_ATTACHMENT_FAILURE = 'DELETE_ATTACHMENT_FAILURE';

export const GET_ATTACHMENT_REQUEST = 'GET_ATTACHMENT_REQUEST';
export const GET_ATTACHMENT_SUCCESS = 'GET_ATTACHMENT_SUCCESS';
export const GET_ATTACHMENT_FAILURE = 'GET_ATTACHMENT_FAILURE';

export const UPLOAD_ATTACHMENT_REQUEST = 'UPLOAD_ATTACHMENT_REQUEST';
export const UPLOAD_ATTACHMENT_SUCCESS = 'UPLOAD_ATTACHMENT_SUCCESS';
export const UPLOAD_ATTACHMENT_FAILURE = 'UPLOAD_ATTACHMENT_FAILURE';

export const UPLOAD_POST_IMG_REQUEST = '@boldr/admin/UPLOAD_POST_IMG_REQUEST';
export const UPLOAD_POST_IMG_SUCCESS = '@boldr/admin/UPLOAD_POST_IMG_SUCCESS';
export const UPLOAD_POST_IMG_FAILURE = '@boldr/admin/UPLOAD_POST_IMG_FAILURE';

export const UPDATE_ATTACHMENT_REQUEST = '@boldr/admin/UPDATE_ATTACHMENT_REQUEST';
export const UPDATE_ATTACHMENT_SUCCESS = '@boldr/admin/UPDATE_ATTACHMENT_SUCCESS';
export const UPDATE_ATTACHMENT_FAILURE = '@boldr/admin/UPDATE_ATTACHMENT_FAILURE';

export const SELECT_FILE = '@boldr/admin/attachments/SELECT_FILE';

// dashboard
export const LOAD_ACTIVITIES_REQUEST = '@boldr/admin/dashboard/activity/LOAD_ACTIVITIES_REQUEST';
export const LOAD_ACTIVITIES_SUCCESS = '@boldr/admin/dashboard/activity/LOAD_ACTIVITIES_SUCCESS';
export const LOAD_ACTIVITIES_FAILURE = '@boldr/admin/dashboard/activity/LOAD_ACTIVITIES_FAILURE';

export const SHOW_SIDEBAR = '@boldr/admin/dashboard/SHOW_SIDEBAR';
export const HIDE_SIDEBAR = '@boldr/admin/dashboard/HIDE_SIDEBAR';

export const FETCH_STATS_REQUEST = '@boldr/admin/dashboard/FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = '@boldr/admin/dashboard/FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = '@boldr/admin/dashboard/FETCH_STATS_FAILURE';

// members
export const LOAD_MEMBERS_REQUEST = '@boldr/dashboard/members/LOAD_MEMBERS_REQUEST';
export const LOAD_MEMBERS_SUCCESS = '@boldr/dashboard/members/LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_FAILURE = '@boldr/dashboard/members/LOAD_MEMBERS_FAILURE';
export const UPDATE_MEMBER_REQUEST = '@boldr/dashboard/members/UPDATE_MEMBER_REQUEST';
export const UPDATE_MEMBER_SUCCESS = '@boldr/dashboard/members/UPDATE_MEMBER_SUCCESS';
export const UPDATE_MEMBER_FAILURE = '@boldr/dashboard/members/UPDATE_MEMBER_FAILURE';
export const MEMBER_SELECTED = '@boldr/dashboard/members/MEMBER_SELECTED';

// posts
export const FETCH_POSTS_REQUEST = '@boldr/blog/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = '@boldr/blog/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = '@boldr/blog/FETCH_POSTS_FAILURE';

export const GET_POST_REQUEST = '@boldr/blog/GET_POST_REQUEST';
export const GET_POST_SUCCESS = '@boldr/blog/GET_POST_SUCCESS';
export const GET_POST_FAILURE = '@boldr/blog/GET_POST_FAILURE';

export const UPDATE_POST_REQUEST = '@boldr/dashboard/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = '@boldr/dashboard/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = '@boldr/dashboard/UPDATE_POST_FAILURE';

export const CREATE_POST_REQUEST = '@boldr/dashboard/CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = '@boldr/dashboard/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = '@boldr/dashboard/CREATE_POST_FAILURE';

export const DELETE_POST_FAILURE = '@boldr/dashboard/DELETE_POST_FAILURE';
export const DELETE_POST_REQUEST = '@boldr/dashboard/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = '@boldr/dashboard/DELETE_POST_SUCCESS';

export const TOGGLE_POST_LAYOUT = '@boldr/TOGGLE_POST_LAYOUT';
export const SHOW_POST_ALL = 'SHOW_POST_ALL';
export const SHOW_POST_CURRENT_TAG = 'SHOW_POST_CURRENT_TAG';
export const SHOW_POST_TAG = 'SHOW_POST_TAG';
export const SELECT_POST = 'SELECT_POST';
export const SELECT_POST_SUCCESS = 'SELECT_POST_SUCCESS';
export const SELECT_POST_FAILURE = 'SELECT_POST_FAILURE';

// tags
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

// Menu
export const GET_MAIN_MENU_REQUEST = '@boldr/menu/GET_MAIN_MENU_REQUEST';
export const GET_MAIN_MENU_SUCCESS = '@boldr/menu/GET_MAIN_MENU_SUCCESS';
export const GET_MAIN_MENU_FAILURE = '@boldr/menu/FETCH_MENUS_FAILURE';

export const UPDATE_MENU_REQUEST = '@boldr/MENU/UPDATE_MENU_REQUEST';
export const UPDATE_MENU_SUCCESS = '@boldr/MENU/UPDATE_MENU_SUCCESS';
export const UPDATE_MENU_FAILURE = '@boldr/MENU/UPDATE_MENU_FAILURE';

export const ADD_MENU_DETAIL_REQUEST = '@boldr/MENU/ADD_MENU_DETAIL_REQUEST';
export const ADD_MENU_DETAIL_SUCCESS = '@boldr/MENU/ADD_MENU_DETAIL_SUCCESS';
export const ADD_MENU_DETAIL_FAILURE = '@boldr/MENU/ADD_MENU_DETAIL_FAILURE';

// Settings
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

// Templates
export const FETCH_TEMPLATES_REQUEST = '@boldr/templates/FETCH_TEMPLATES_REQUEST';
export const FETCH_TEMPLATES_SUCCESS = '@boldr/pages/FETCH_TEMPLATES_SUCCESS';
export const FETCH_TEMPLATES_FAILURE = '@boldr/pages/FETCH_TEMPLATES_FAILURE';

export const FETCH_TEMPLATE_REQUEST = '@boldr/pages/FETCH_TEMPLATE_REQUEST';
export const FETCH_TEMPLATE_SUCCESS = '@boldr/pages/FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_FAILURE = '@boldr/pages/FETCH_TEMPLATE_FAILURE';

// Pages
export const FETCH_PAGES_REQUEST = '@boldr/templates/FETCH_PAGES_REQUEST';
export const FETCH_PAGES_SUCCESS = '@boldr/pages/FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = '@boldr/pages/FETCH_PAGES_FAILURE';

export const FETCH_PAGE_REQUEST = '@boldr/pages/FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = '@boldr/pages/FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = '@boldr/pages/FETCH_PAGE_FAILURE';
