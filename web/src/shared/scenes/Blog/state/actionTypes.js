/**
 * Post action types
 * @type {String}
 */

export const FETCH_ARTICLES_REQUEST = '@boldr/blog/FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = '@boldr/blog/FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = '@boldr/blog/FETCH_ARTICLES_FAILURE';

export const FETCH_ARTICLE_REQUEST = '@boldr/blog/FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_SUCCESS = '@boldr/blog/FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = '@boldr/blog/FETCH_ARTICLE_FAILURE';

export const UPDATE_ARTICLE_REQUEST = '@boldr/admin/posts/UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_SUCCESS = '@boldr/admin/posts/UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = '@boldr/admin/posts/UPDATE_ARTICLE_FAILURE';

export const CREATE_ARTICLE_REQUEST = '@boldr/admin/posts/CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = '@boldr/admin/posts/CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = '@boldr/admin/posts/CREATE_ARTICLE_FAILURE';

export const DELETE_ARTICLE_FAILURE = '@boldr/admin/posts/DELETE_ARTICLE_FAILURE';
export const DELETE_ARTICLE_REQUEST = '@boldr/admin/posts/DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = '@boldr/admin/posts/DELETE_ARTICLE_SUCCESS';

export const TOGGLE_POST_LAYOUT = '@boldr/blog/TOGGLE_POST_LAYOUT';
export const SELECT_ARTICLE = '@boldr/blog/SELECT_ARTICLE';
export const SELECT_ARTICLE_SUCCESS = '@boldr/blog/SELECT_ARTICLE_SUCCESS';
export const SELECT_ARTICLE_FAILURE = '@boldr/blog/SELECT_ARTICLE_FAILURE';

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
