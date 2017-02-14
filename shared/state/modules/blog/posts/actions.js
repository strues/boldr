/* @flow */
import { normalize, arrayOf, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import merge from 'lodash/merge';
import * as api from '../../../../core/api';
import * as notif from '../../../../core/constants';
import type { Post } from '../../../../types/models';
import { notificationSend } from '../../../../state/modules/notifications/notifications';
import * as t from '../../actionTypes';
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

        const camelizedJson = camelizeKeys(response.body);
        const normalizedData = normalize(response.body, arrayOfPost);
        // console.log(normalized)
        dispatch(receivePosts(normalizedData));
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
  const posts = state.blog.posts.ids;
  if (!posts.length) {
    return true;
  }
  return false;
}

export const requestPosts = () => {
  return { type: t.FETCH_POSTS_REQUEST };
};

export const receivePosts = (normalizedData) => {
  return {
    type: t.FETCH_POSTS_SUCCESS,
    payload: normalizedData,
  };
};

export const receivePostsFailed = (err) => ({
  type: t.FETCH_POSTS_FAILURE, error: err,
});

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
    dispatch(beginCreatePost());
    return api.createPost(data)
      .then(response => {
        const camelizedJson = camelizeKeys(response.body);
        const normalizedData = normalize(response.body, postSchema);
        dispatch(createPostSuccess(normalizedData));
        dispatch(notificationSend(notif.MSG_CREATE_POST_SUCCESS));
      })
      .catch(err => {
        dispatch(errorCreatingPost(err));
        dispatch(notificationSend(notif.MSG_CREATE_POST_FAILUREURE));
      });
  };
}

const beginCreatePost = () => {
  return { type: t.CREATE_POST_REQUEST };
};

const createPostSuccess = (normalizedData: Object) => {
  return {
    type: t.CREATE_POST_SUCCESS,
    payload: normalizedData,
  };
};

const errorCreatingPost = (err) => {
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

export function deletePost(id: String) {
  return (dispatch: Function) => {
    dispatch({
      type: t.DELETE_POST_REQUEST,
    });
    return api.delPostById(id)
      .then(response => {
        if (response.status !== 204) {
          dispatch(deletePostFail(response));
        }
        dispatch({
          type: t.DELETE_POST_SUCCESS,
          id,
        });
      })
      .catch(err => {
        dispatch(deletePostFail(err));
      });
  };
}

const deletePostFail = (err) => ({
  type: t.DELETE_POST_FAILURE,
  error: err,
});

/**
  * UPDATE POST ACTIONS
  * -------------------------
  * @exports updatePost
  *****************************************************************/

export function updatePost(postData: Post) {
  return (dispatch: Function) => {
    console.log('action', postData);
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
  return { type: t.UPDATE_POST_REQUEST };
};
const updatePostSuccess = (response) => {
  return { type: t.UPDATE_POST_SUCCESS };
};
const errorUpdatingPost = (err) => {
  return {
    type: t.UPDATE_POST_FAILURE,
    error: err,
  };
};

/**
  * FETCH POST FROM SLUG ACTIONS
  * -------------------------
  * @exports fetchPostFromSlug
  *****************************************************************/

export function fetchPostFromSlug(slug: String) {
  return (dispatch: Function) => {
    dispatch(requestPostFromSlug());
    return api.getPostBySlug(slug)
      .then(response => {
        if (response.status !== 200) {
          dispatch(receivePostFromSlugFailed());
        }
        const data = response.body;
        dispatch(receivePostFromSlug(data));
      })
      .catch(err => {
        dispatch(receivePostFromSlugFailed(err));
      });
  };
}
const requestPostFromSlug = () => {
  return { type: t.GET_POST_REQUEST };
};

const receivePostFromSlug = (data) => {
  return {
    type: t.GET_POST_SUCCESS,
    payload: data,
  };
};

const receivePostFromSlugFailed = (err) => ({
  type: t.GET_POST_FAILURE, error: err,
});
