import { normalize } from 'normalizr';
import api, { API_PREFIX } from '../../../../core/api';
import * as notif from '../../../../core/constants';
import { sendNotification } from '../../../../state';
import * as t from '../actionTypes';
import { tag as tagSchema, arrayOfTag } from './schema';

/**
  * FETCH TAG ACTIONS
  * -------------------------
  * @exports fetchTags
  * @exports fetchTagsIfNeeded
  *****************************************************************/
/**
   * @function fetchTagsIfNeeded
   * @description Function that determines whether or not tags need to be
   * fetched from the api. Dispatches either the fetchTags Function
   * or returns the resolved promise if the tags are up to date.
   * @return {Promise} Tags Promise that resolves when tags are fetched
   * or they arent required to be refreshed.
   */
/* istanbul ignore next */
export const fetchTagsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchTags(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchTags(axios));
  }

  /* istanbul ignore next */
  return null;
};
/**
 * Function to retrieve tags from the api.
 * @return {Array} Tags returned as an array of tag objects.
 */
export const fetchTags = (axios: any): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: t.FETCH_TAGS_REQUEST });

  return axios
    .get(`${API_PREFIX}/tags?include=posts`)
    .then(res => {
      const normalizedData = normalize(res.data, arrayOfTag);
      dispatch({
        type: t.FETCH_TAGS_SUCCESS,
        payload: normalizedData,
      });
    })
    .catch(err => {
      dispatch({
        type: t.FETCH_TAGS_FAILURE,
        error: err,
      });
    });
};

/**
 * Called by fetchTagsIfNeeded to retrieve the state containing tags
 * @param  {Object} state   The blog state which contains tags
 */
function shouldFetchTags(state: Reducer) {
  const tags = state.blog.tags.ids;
  if (!tags.length) {
    return true;
  }
  return false;
}

/**
  * SELECT TAG ACTIONS
  * -------------------------
  * @exports selectTag
  * @exports clearTag
  *****************************************************************/

export function selectTag(tag: Object) {
  return {
    type: t.SELECT_TAG,
    tag,
  };
}
export function clearTag(tag: Object) {
  return {
    type: t.CLEAR_TAG,
  };
}

/**
  * FETCH TAGGED POST ACTIONS
  * -------------------------
  * @exports fetchTagPosts
  *****************************************************************/
export const fetchTagPosts = (name: string, axios: any): ThunkAction => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: t.FETCH_TAGGED_POST_REQUEST,
    name,
  });

  return axios
    .get(`${API_PREFIX}/tags/${name}/posts`)
    .then(res => {
      dispatch({
        type: t.FETCH_TAGGED_POST_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: t.FETCH_TAGGED_POST_FAILURE,
        error: err,
      });
    });
};
/* istanbul ignore next */
export const fetchTagPostsIfNeeded = (name: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any,
) => {
  /* istanbul ignore next */
  if (shouldFetchTagPosts(getState(), name)) {
    /* istanbul ignore next */
    return dispatch(fetchTagPosts(name, axios));
  }

  /* istanbul ignore next */
  return null;
};
/* istanbul ignore next */
const shouldFetchTagPosts = (state: Reducer, name: string): boolean => {
  // In development, we want to allow dispatching actions from here
  // or the hot reloading of reducers wont update the component state
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const singleTag = state.blog.tags.ids;

  if (singleTag && state.blog.tags.isFetching) {
    return false;
  }

  return true;
};

/**
  * CREATE TAG ACTIONS
  * -------------------------
  * @exports createTag
  *****************************************************************/

export function createTag(values) {
  const data = {
    name: values.name,
    description: values.description,
  };
  return dispatch => {
    dispatch(beginAddTag());
    return api.post(`${API_PREFIX}/tags`, data).then(res => {
      if (!res.status === 201) {
        dispatch(addTagFailure(res));
        dispatch(sendNotification(notif.MSG_ADD_TAG_FAILURE));
      }
      dispatch(addTagSuccess(res));
      dispatch(sendNotification(notif.MSG_ADD_TAG_SUCCESS));
    });
  };
}

function beginAddTag() {
  return {
    type: t.ADD_TAG_REQUEST,
  };
}

function addTagSuccess(res) {
  return {
    type: t.ADD_TAG_SUCCESS,
    payload: res.data,
  };
}

function addTagFailure(res) {
  return {
    type: t.ADD_TAG_FAILURE,
    error: res.err,
  };
}

/**
  * DELETE TAG ACTIONS
  * -------------------------
  * @exports deleteTag
  *****************************************************************/

export function deleteTag(id) {
  return dispatch => {
    dispatch({
      type: t.DELETE_TAG_REQUEST,
    });
    return api
      .delete(`${API_PREFIX}/tags/${id}`)
      .then(res => {
        dispatch({
          type: t.DELETE_TAG_SUCCESS,
          id,
        });
        dispatch(sendNotification(notif.MSG_DELETE_TAG_SUCCESS));
      })
      .catch(err => {
        dispatch(deleteTagFail(err));
        dispatch(sendNotification(notif.MSG_DELETE_TAG_FAILURE));
      });
  };
}

const deleteTagFail = err => ({
  type: t.DELETE_TAG_FAILURE,
  error: err.error.message,
});
