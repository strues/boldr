/* @flow */
import * as api from 'core/api';
import * as notif from 'core/config/notifications';
import type { Post } from '../../types/models';
// import type { ActionType } from '../../types/redux';
import { notificationSend } from './notifications';

export const LOAD_POSTS_REQUEST = '@boldr/LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = '@boldr/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = '@boldr/LOAD_POSTS_FAILURE';
export const GET_POST_REQUEST = '@boldr/GET_POST_REQUEST';
export const GET_POST_SUCCESS = '@boldr/GET_POST_SUCCESS';
export const GET_POST_FAILURE = '@boldr/GET_POST_FAILURE';
export const UPDATE_POST_REQUEST = '@boldr/dashboard/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = '@boldr/dashboard/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = '@boldr/dashboard/UPDATE_POST_FAILURE';
export const SELECT_POST = 'SELECT_POST';
export const SELECT_POST_SUCCESS = 'SELECT_POST_SUCCESS';
export const SELECT_POST_FAILURE = 'SELECT_POST_FAILURE';
export const CREATE_POST_REQUEST = '@boldr/dashboardCREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = '@boldr/dashboardCREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = '@boldr/dashboard/CREATE_POST_FAILURE';
export const DELETE_POST_FAILURE = '@boldr/dashboard/DELETE_POST_FAILURE';
export const DELETE_POST_REQUEST = '@boldr/dashboard/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = '@boldr/dashboard/DELETE_POST_SUCCESS';

export const TOGGLE_POST_LAYOUT = '@boldr/TOGGLE_POST_LAYOUT';
export const SHOW_POST_ALL = 'SHOW_POST_ALL';
export const SHOW_POST_CURRENT_TAG = 'SHOW_POST_CURRENT_TAG';
export const SHOW_POST_TAG = 'SHOW_POST_TAG';


export function togglePostLayoutView() {
  return { type: TOGGLE_POST_LAYOUT };
}

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
  return (dispatch: Function, getState: Function) => {
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
  return (dispatch: Function) => {
    dispatch(requestPosts());
    return api.getAllPosts()
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
  if (posts.loading) {
    return false;
  }
  return posts;
}

const requestPosts = () => {
  return { type: LOAD_POSTS_REQUEST };
};

const receivePosts = (response) => {
  return {
    type: LOAD_POSTS_SUCCESS,
    payload: response.body.results,
  };
};

const receivePostsFailed = (err) => ({
  type: LOAD_POSTS_FAILURE, error: err,
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
  return (dispatch: Function) => {
    dispatch(beginCreatePost());
    return api.createPost(data)
      .then(response => {
        if (response.status !== 201) {
          dispatch(errorCreatingPost(response));
        }
        dispatch(createPostSuccess(response));
        dispatch(notificationSend(notif.MSG_CREATE_POST_SUCCESS));
      })
      .catch(err => {
        dispatch(errorCreatingPost(err));
        dispatch(notificationSend(notif.MSG_CREATE_POST_FAILUREURE));
      });
  };
}

const beginCreatePost = () => {
  return { type: CREATE_POST_REQUEST };
};

const createPostSuccess = (response: Object) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: response.body,
  };
};

const errorCreatingPost = (err) => {
  return {
    type: CREATE_POST_FAILURE,
    error: err,
  };
};

/**
  * DELETE POST ACTIONS
  * -------------------------
  * @exports deletePost
  *****************************************************************/

export function deletePost(id: String) {
  return (dispatch: Function) => {
    dispatch({
      type: DELETE_POST_REQUEST,
    });
    return api.delPostById(id)
      .then(response => {
        if (response.status !== 204) {
          dispatch(deletePostFail(response));
        }
        dispatch({
          type: DELETE_POST_SUCCESS,
          id,
        });
      })
      .catch(err => {
        dispatch(deletePostFail(err));
      });
  };
}

const deletePostFail = (err) => ({
  type: DELETE_POST_FAILURE,
  error: err,
});


export function updatePost(postData: Post) {
  return (dispatch: Function) => {
    dispatch(updatePostDetails(postData));
    return api.putPostId(postData)
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
const updatePostDetails = () => {
  return { type: UPDATE_POST_REQUEST };
};
const updatePostSuccess = (response) => {
  return { type: UPDATE_POST_SUCCESS };
};
const errorUpdatingPost = (err) => {
  return {
    type: UPDATE_POST_FAILURE,
    error: err,
  };
};


//
// Selectors
// -----------------

export const getPosts = (state: Object) => state.posts.list;
export type State = { loading: boolean, error: null, list: Array<String>, bySlug: Post }
//
// Reducer
// -----------------
const INITIAL_STATE = {
  loaded: false,
  error: null,
  list: [],
  bySlug: {},
};

/**
 *  postsReducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */

export default function postsReducer(state: State = INITIAL_STATE, action: Object) {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
    case GET_POST_REQUEST:
    case CREATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.payload,
        bySlug: action.payload.reduce((list, a) => ({
          ...list,
          [a.slug]: a,
        }), {}),
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        current: action.payload,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        entities: [...state.entities].filter((entity) => entity.id !== action.id),
      };
    case LOAD_POSTS_FAILURE:
    case GET_POST_FAILURE:
    case CREATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
      };
    case SELECT_POST:
      return {
        ...state,
        loading: false,
        id: action.id,
        isEditing: true,
      };
    case SELECT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.current,
        isEditing: true,
      };
    case SELECT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isEditing: true,
      };
    case TOGGLE_POST_LAYOUT:
      return {
        ...state,
      };
    default:
      return state;
  }
}
