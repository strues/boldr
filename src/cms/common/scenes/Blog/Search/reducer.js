import fetch from 'isomorphic-fetch';
import request from 'superagent';
import { API_PREFIX, API_POSTS } from 'core/config';
import { notificationSend } from 'state/dux/notifications';
import { processResponse } from 'core/services/api';
import * as types from './constants';

const requestPosts = () => {
  return { type: types.LOAD_POSTS_REQUEST };
};
const receivePosts = (json) => ({
  type: types.LOAD_POSTS_SUCCESS,
  data: json.data,
  pagination: json.pagination,
});
const receivePostsFailed = (err) => ({
  type: types.LOAD_POSTS_FAILURE, error: err,
});

/**
 * @function fetchPostsIfNeeded
 * @description Function that determines whether or not posts need to be
 * fetched from the api. Dispatches either the fetchPosts Function
 * or returns the resolved promise if the posts are up to date.
 * @return {Promise} Posts Promise that resolves when posts are fetched
 * or they arent required to be refreshed.
 */
export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }

    return Promise.resolve();
  };
}
/**
 * Called by fetchPostsIfNeeded to retrieve the state containing posts
 * @param  {Object} state   The blog state which contains posts
 */
function shouldFetchPosts(state) {
  const posts = state.posts;
  if (!posts.data) {
    return true;
  }
  if (posts.loading) {
    return false;
  }
  return posts;
}
/**
 * Function to retrieve posts from the api.
 * @return {Array} Posts returned as an array of post objects.
 */
export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch(`${API_PREFIX}/posts`)
      .then(response => processResponse(response))
      .then(json => dispatch(receivePosts(json)))
      .catch(err => {
        dispatch(receivePostsFailed(err));
      });
  };
}

const requestPost = () => {
  return { type: types.GET_POST_REQUEST };
};
const receivedPost = (json) => ({
  type: types.GET_POST_SUCCESS,
  payload: json,
});
const receivePostFailed = (err) => ({
  type: types.GET_POST_FAILURE,
  error: err,
});

/**
 * Retrieves a specific post from the API based on the value of its slug
 * @param  {string} slug the slug is the title of the post normalized / sluggified
 * @return {Object}      The post object
 */
export function loadPost(slug) {
  return dispatch => {
    dispatch(requestPost());
    return fetch(`${API_POSTS}/${slug}`)
      .then(response => processResponse(response))
      .then(json => dispatch(receivedPost(json)))
      .catch(err => {
        dispatch(receivePostFailed(err));
      });
  };
}
/**
 * CREATE ARTICLE ACTIONS
 */
const beginCreatePost = () => {
  return { type: types.CREATE_POST_REQUEST };
};

const createPostSuccess = (response) => {
  return {
    type: types.CREATE_POST_SUCCESS,
    payload: response.body,
  };
};
const errorCreatingPost = (err) => {
  return {
    type: types.CREATE_POST_FAILURE,
    error: err,
  };
};

/**
 * Create a new article takes the submitted form-data as articleData and
 * sends the information to the api.
 * @param  {Object} articleData The data from the form / article editor
 * @return {Object}             Response object.
 */
export function createPost(postData) {
  return (dispatch) => {
    dispatch(beginCreatePost());
    return request
      .post(API_POSTS)
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .send({
        title: postData.title,
        content: postData.content,
        tags: postData.tags,
        status: postData.status,
        excerpt: postData.excerpt,
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(createPostSuccess(response));
          dispatch(notificationSend({
            message: 'Post created successfully.',
            kind: 'info',
            dismissAfter: 3000,
          }));
        }
      })
      .catch(err => {
        dispatch(errorCreatingPost(err));
      });
  };
}

/**
 * Select Post
 * @description Used when on the article list state.
 */
const postSelected = (articleId) => {
  return {
    type: types.SELECT_POST,
    id: articleId,
  };
};

const receiveSelectedPost = (response) => ({
  type: types.SELECT_POST_SUCCESS,
  current: response.body,
});

const receiveSelectedPostFailed = (err) => ({
  type: types.SELECT_POST_FAILURE,
  error: err,
});

/**
 * Takes the user selected article and fetches the data from
 * the api.
 * @param  {String} articleId Technically its the uuid, but for all
 * intents and purposes its a String
 * @return {Object}           The post object.
 */
export function selectPost(postId) {
  return (dispatch) => {
    dispatch(postSelected(postId));
    return request
      .get(`${API_POSTS}/id/${postId}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveSelectedPost(response));
        }
      })
      .catch(err => {
        dispatch(receiveSelectedPostFailed(err));
      });
  };
}
const updatePostDetails = () => {
  return { type: types.UPDATE_POST_REQUEST };
};
const updatePostSuccess = () => {
  return { type: types.UPDATE_POST_SUCCESS };
};
const errorUpdatingPost = (err) => {
  return {
    type: types.UPDATE_POST_FAIL,
    error: err,
  };
};

export function updatePost(postData) {
  // const articleSlug = slug(articleData.title);
  const payload = {
    title: postData.title,
    content: postData.content,
    excerpt: postData.excerpt,
    feature_image: postData.feature_image,
    status: postData.status,
  };
  return dispatch => {
    dispatch(updatePostDetails(postData));
    return request
      .put(`${API_POSTS}/${postData.origSlug}`)
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .send({
        // title: articleData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        feature_image: postData.feature_image,
        tags: postData.tags,
        status: postData.status,
      })
      .then(response => {
        dispatch(updatePostSuccess(response));
        dispatch(notificationSend({
          message: 'Updated article.',
          kind: 'info',
          dismissAfter: 3000,
        }));
      })
      .catch(
        err => {
          dispatch(errorUpdatingPost(err.message));
          dispatch(notificationSend({
            message: 'There was a problem updating the article.',
            kind: 'error',
            dismissAfter: 3000,
          }));
        });
  };
}

export const INITIAL_STATE = {
  loading: false,
  error: null,
  data: [],
  pagination: {},
  selectedPost: {},
  current: {},
  isEditing: false,
};

/**
 * Blog Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */
export default function searchReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case types.LOAD_POSTS_REQUEST:
    case types.GET_POST_REQUEST:
    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pagination: action.pagination,
        data: action.data,
      };
    case types.GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPost: action.payload,
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.LOAD_POSTS_FAILURE:
    case types.GET_POST_FAILURE:
    case types.CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.SELECT_POST:
      return {
        ...state,
        loading: false,
        id: action.id,
        isEditing: true,
      };
    case types.SELECT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.current,
        isEditing: true,
      };
    case types.SELECT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isEditing: true,
      };
    default:
      return state;
  }
}
