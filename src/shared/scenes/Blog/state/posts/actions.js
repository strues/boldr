/* @flow */
import { normalize } from 'normalizr';
import api, { API_PREFIX } from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { sendNotification } from '../../../../state';

import type {
  Dispatch,
  GetState,
  ThunkAction,
  Reducer,
} from '../../../../types/redux';
import * as t from '../actionTypes';
import { post as postSchema, arrayOfPost } from './schema';

export function togglePostLayoutView() {
  return { type: t.TOGGLE_POST_LAYOUT };
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
/* istanbul ignore next */
export const fetchPostsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchPosts(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchPosts(axios));
  }

  /* istanbul ignore next */
  return null;
};

/**
 * Function to retrieve posts from the api.
 * @return {Array} Posts returned as an array of post objects.
 */
export const fetchPosts = (axios: any): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: t.FETCH_POSTS_REQUEST });

  return axios
    .get(`${API_PREFIX}/posts?include=[author,tags]`)
    .then(res => {
      const posts = res.data.results;
      const normalizedPosts = normalize(posts, arrayOfPost);

      dispatch({
        type: t.FETCH_POSTS_SUCCESS,
        payload: normalizedPosts,
      });
    })
    .catch(err => {
      dispatch({
        type: t.FETCH_POSTS_FAILURE,
        error: err,
      });
    });
};
/**
 * Called by fetchPostsIfNeeded to retrieve the state containing posts
 * @param  {Object} state   The blog state which contains posts
 */
function shouldFetchPosts(state: Reducer) {
  const posts = state.blog.posts.ids;
  if (!posts.length) {
    return true;
  }
  return false;
}

/**
  * FETCH POST FROM SLUG ACTIONS
  * -------------------------
  * @exports fetchPost
  * @exports fetchPostIfNeeded
  *****************************************************************/
export const fetchPost = (slug: string, axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: t.FETCH_POST_REQUEST,
    slug,
  });
  return axios
    .get(`${API_PREFIX}/posts/slug/${slug}?include=[author,tags]`)
    .then(res => {
      const singlePost = res.data;
      const normalizedPost = normalize(singlePost, postSchema);
      return dispatch({
        type: t.FETCH_POST_SUCCESS,
        payload: normalizedPost,
        slug,
      });
    })
    .catch(err => {
      dispatch({
        type: t.FETCH_POST_FAILURE,
        error: err,
      });
    });
};

/**
 * @function fetchPostIfNeeded
 * @description Function that determines whether or not posts need to be
 * fetched from the api. Dispatches either the fetchPosts Function
 * or returns the resolved promise if the posts are up to date.
 * @return {Promise} Posts Promise that resolves when posts are fetched
 * or they arent required to be refreshed.
 */
/* istanbul ignore next */
export const fetchPostIfNeeded = (slug: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchPost(getState(), slug)) {
    /* istanbul ignore next */
    return dispatch(fetchPost(slug, axios));
  }

  /* istanbul ignore next */
  return null;
};

/**
 * Called by fetchPostIfNeeded to retrieve the state containing posts
 * @param  {Object} state   The blog state which contains posts
 */
/* istanbul ignore next */
const shouldFetchPost = (state: Reducer, slug: string): boolean => {
  // In development, we want to allow dispatching actions from here
  // or the hot reloading of reducers wont update the component state
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const singlePost = state.blog.posts.all[slug];

  if (singlePost && state.blog.posts.isFetching) {
    return false;
  }

  return true;
};

export function selectPost(post: Object) {
  return {
    type: t.SELECT_POST,
    post,
  };
}

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
    dispatch({ type: t.CREATE_POST_REQUEST });
    return api
      .post(`${API_PREFIX}/posts`, data)
      .then(res => {
        const normalizedData = normalize(res.data, postSchema);
        dispatch(createPostSuccess(normalizedData));
        dispatch(sendNotification(notif.MSG_CREATE_POST_SUCCESS));
      })
      .catch(err => {
        dispatch(errorCreatingPost(err));
        dispatch(sendNotification(notif.MSG_CREATE_POST_FAILUREURE));
      });
  };
}

const createPostSuccess = (normalizedData: Object) => {
  return {
    type: t.CREATE_POST_SUCCESS,
    payload: normalizedData,
  };
};

const errorCreatingPost = err => {
  return {
    type: t.CREATE_POST_FAILURE,
    error: err,
  };
};

/**
  * DELETE POST ACTIONS
  * -------------------------
  * @exports deletePost
  *****************************************************************/

export function deletePost(id: string) {
  return (dispatch: Function) => {
    dispatch({
      type: t.DELETE_POST_REQUEST,
    });
    return api
      .delete(`${API_PREFIX}/posts/${id}`)
      .then(res => {
        dispatch({
          type: t.DELETE_POST_SUCCESS,
          id,
        });
      })
      .catch(err => {
        dispatch({
          type: t.DELETE_POST_FAILURE,
          error: err,
        });
      });
  };
}

/**
  * UPDATE POST ACTIONS
  * -------------------------
  * @exports updatePost
  *****************************************************************/

export function updatePost(postData: Post) {
  return (dispatch: Function) => {
    dispatch({ type: t.UPDATE_POST_REQUEST });
    return api
      .put(`${API_PREFIX}/posts/${postData.id}`, postData)
      .then(res => {
        dispatch({
          type: t.UPDATE_POST_SUCCESS,
          payload: res.data,
        });
        dispatch(
          sendNotification({
            message: 'Updated article.',
            kind: 'info',
            dismissAfter: 3000,
          }),
        );
      })
      .catch(err => {
        dispatch({
          type: t.UPDATE_POST_FAILURE,
          error: err,
        });
        dispatch(
          sendNotification({
            message: 'There was a problem updating the article.',
            kind: 'error',
            dismissAfter: 3000,
          }),
        );
      });
  };
}
