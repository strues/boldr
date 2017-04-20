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

export const FETCH_TAGGED_POST_REQUEST =
  '@boldr/blog/FETCH_TAGGED_POST_REQUEST';
export const FETCH_TAGGED_POST_SUCCESS =
  '@boldr/blog/FETCH_TAGGED_POST_SUCCESS';
export const FETCH_TAGGED_POST_FAILURE =
  '@boldr/blog/FETCH_TAGGED_POST_FAILURE';

export const ADD_TAG_REQUEST = '@boldr/blog/ADD_TAG_REQUEST';
export const ADD_TAG_SUCCESS = '@boldr/blog/ADD_TAG_SUCCESS';
export const ADD_TAG_FAILURE = '@boldr/blog/ADD_TAG_FAILURE';

export const DELETE_TAG_REQUEST = '@boldr/blog/DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = '@boldr/blog/DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = '@boldr/blog/DELETE_TAG_FAILURE';

export const SELECT_TAG = '@boldr/blog/SELECT_TAG';
export const CLEAR_TAG = '@boldr/blog/CLEAR_TAG';
