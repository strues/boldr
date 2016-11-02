/* @flow */
import request from 'superagent';
import * as api from 'core/services/api';
import * as notif from 'core/config/notifications';
import { API_POSTS } from 'core/config';
import type { Post } from '../../types/models';
import { notificationSend } from './notifications';

const FETCH_POSTS_REQUEST = '@boldr/FETCH_POSTS_REQUEST';
const FETCH_POSTS_SUCCESS = '@boldr/FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAILURE = '@boldr/FETCH_POSTS_FAILURE';
const LOAD_POST_REQUEST = '@boldr/LOAD_POST_REQUEST';
const LOAD_POST_SUCCESS = '@boldr/LOAD_POST_SUCCESS';
const LOAD_POST_FAILURE = '@boldr/LOAD_POST_FAILURE';
const UPDATE_POST_REQUEST = '@boldr/dashboard/UPDATE_POST_REQUEST';
const UPDATE_POST_SUCCESS = '@boldr/dashboard/UPDATE_POST_SUCCESS';
const UPDATE_POST_FAILURE = '@boldr/dashboard/UPDATE_POST_FAILURE';
const SELECT_POST = 'SELECT_POST';
const SELECT_POST_SUCCESS = 'SELECT_POST_SUCCESS';
const SELECT_POST_FAIL = 'SELECT_POST_FAIL';
const CREATE_POST_REQUEST = '@boldr/dashboardCREATE_POST_REQUEST';
const CREATE_POST_SUCCESS = '@boldr/dashboardCREATE_POST_SUCCESS';
const CREATE_POST_FAIL = '@boldr/dashboard/CREATE_POST_FAIL';
const DELETE_POST_FAILURE = '@boldr/dashboard/DELETE_POST_FAILURE';
const DELETE_POST_REQUEST = '@boldr/dashboard/DELETE_POST_REQUEST';
const DELETE_POST_SUCCESS = '@boldr/dashboard/DELETE_POST_SUCCESS';


/**
  * FETCH POST ACTIONS
  * -------------------------
  * @exports fetchPosts
  * @exports fetchPostsIfNeeded
  *****************************************************************/

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
 * Function to retrieve posts from the api.
 * @return {Array} Posts returned as an array of post objects.
 */
export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return api.doFetchPosts()
      .then(response => {
        if (response.status !== 200) {
          dispatch(receivePostsFailed());
        }
        // const camelizedJson = camelizeKeys(response.body);
        // const normalized = normalize(camelizedJson, arrayOf(postSchema, { idAttribute: 'slug' }));
        dispatch(receivePosts(response));
      })
      .catch(err => {
        dispatch(receivePostsFailed(err));
      });
  };
}

/**
 * Called by fetchPostsIfNeeded to retrieve the state containing posts
 * @param  {Object} state   The blog state which contains posts
 */
function shouldFetchPosts(state) {
  const posts = state.posts;
  if (!posts) {
    return true;
  }
  if (posts.isLoading) {
    return false;
  }
  return posts;
}

const requestPosts = () => {
  return { type: FETCH_POSTS_REQUEST };
};

const receivePosts = (response) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: response.body
  };
};

const receivePostsFailed = (err) => ({
  type: FETCH_POSTS_FAILURE, error: err
});

/**
  * CREATE POST ACTIONS
  * -------------------------
  * @exports createPost
  *****************************************************************/

/**
 * Create a new post takes the submitted form-data as data and
 * sends the information to the api.
 * @param  {Object} data        The data from the form / post editor
 * @return {Object}             Response object.
 */
export function createPost(data: Post) {
  return (dispatch) => {
    dispatch(beginCreatePost());
    return api.doCreatePost(data)
      .then(response => {
        if (response.status !== 201) {
          dispatch(errorCreatingPost(response));
        }
        dispatch(createPostSuccess(response));
        dispatch(notificationSend(notif.MSG_CREATE_POST_SUCCESS));
      })
      .catch(err => {
        dispatch(errorCreatingPost(err));
        dispatch(notificationSend(notif.MSG_CREATE_POST_FAILURE));
      });
  };
}

const beginCreatePost = () => {
  return { type: CREATE_POST_REQUEST };
};

const createPostSuccess = (response: Object) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: response.body
  };
};

const errorCreatingPost = (err) => {
  return {
    type: CREATE_POST_FAIL,
    error: err
  };
};

/**
  * DELETE POST ACTIONS
  * -------------------------
  * @exports deletePost
  *****************************************************************/

export function deletePost(id: String) {
  return (dispatch) => {
    dispatch({
      type: DELETE_POST_REQUEST
    });
    return api.doDeletePost(id)
      .then(response => {
        if (response.status !== 204) {
          dispatch(deletePostFail(response));
        }
        dispatch({
          type: DELETE_POST_SUCCESS,
          id
        });
      })
      .catch(err => {
        dispatch(deletePostFail(err));
      });
  };
}

const deletePostFail = (err) => ({
  type: DELETE_POST_FAILURE,
  error: err
});


export function updatePost(postData: Post) {
  return dispatch => {
    dispatch(updatePostDetails(postData));
    return request
      .put(`${API_POSTS}/pid/${postData.id}`)
      .set('Authorization', `${localStorage.getItem('token')}`)
      .send({
        // title: articleData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        feature_image: postData.feature_image,
        tag: postData.tag,
        status: postData.status
      })
      .then(response => {
        dispatch(updatePostSuccess(response));
        dispatch(notificationSend({
          message: 'Updated article.',
          kind: 'info',
          dismissAfter: 3000
        }));
      })
      .catch(
        err => {
          dispatch(errorUpdatingPost(err.message));
          dispatch(notificationSend({
            message: 'There was a problem updating the article.',
            kind: 'error',
            dismissAfter: 3000
          }));
        });
  };
}
const updatePostDetails = () => {
  return { type: UPDATE_POST_REQUEST };
};
const updatePostSuccess = (response) => {
  return { type: UPDATE_POST_SUCCESS };
};
const errorUpdatingPost = (err) => {
  return {
    type: UPDATE_POST_FAILURE,
    error: err
  };
};


//
// Selectors
// -----------------

export const postsToState = (list) => (
  list.reduce((list, a) => ({
    ...list,
    [a.slug]: a
  }), {})
);

export const getPosts = state => state.posts.list;
//
// Reducer
// -----------------
const INITIAL_STATE = {
  isLoading: false,
  error: null
};

/**
 *  postsReducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */

export default function postsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case LOAD_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        bySlug: action.payload.reduce((list, a) => ({
          ...list,
          [a.slug]: a
        }), {})
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        current: action.payload
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        entities: [...state.entities].filter((entity) => entity.id !== action.id)
      };
    case FETCH_POSTS_FAILURE:
    case LOAD_POST_FAILURE:
    case CREATE_POST_FAIL:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case SELECT_POST:
      return {
        ...state,
        isLoading: false,
        id: action.id,
        isEditing: true
      };
    case SELECT_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        current: action.current,
        isEditing: true
      };
    case SELECT_POST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        isEditing: true
      };
    default:
      return state;
  }
}
