import { normalize, arrayOf, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import merge from 'lodash/merge';
import * as api from '../../../../core/api';
import * as t from './constants';
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
export function fetchTagsIfNeeded() {
  return (dispatch: Function, getState: Function) => {
    if (shouldFetchTags(getState())) {
      return dispatch(fetchTags());
    }

    return Promise.resolve();
  };
}

/**
 * Function to retrieve tags from the api.
 * @return {Array} Tags returned as an array of tag objects.
 */
export function fetchTags() {
  return (dispatch: Function) => {
    dispatch(requestTags());
    return api.getAllTags()
      .then(response => {
        if (response.status !== 200) {
          dispatch(receiveTagsFailed());
        }

        const camelizedJson = camelizeKeys(response.body);
        const normalizedData = normalize(response.body, arrayOfTag);
        // console.log(normalized)
        dispatch(receiveTags(normalizedData));
      })
      .catch(err => {
        dispatch(receiveTagsFailed(err));
      });
  };
}

/**
 * Called by fetchTagsIfNeeded to retrieve the state containing tags
 * @param  {Object} state   The blog state which contains tags
 */
function shouldFetchTags(state) {
  const tags = state.blog.tags.ids;
  if (!tags.length) {
    return true;
  }
  return false;
}

const requestTags = () => {
  return { type: t.FETCH_TAGS_REQUEST };
};

const receiveTags = (normalizedData) => {
  return {
    type: t.FETCH_TAGS_SUCCESS,
    payload: normalizedData,
  };
};

const receiveTagsFailed = (err) => ({
  type: t.FETCH_TAGS_FAILURE, error: err,
});


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
export function fetchTaggedPost(name) {
  return (dispatch: Function) => {
    dispatch(requestTaggedPost());
    return api.doFetchTags(name)
      .then(response => {
        if (response.status !== 200) {
          dispatch(receiveTaggedPostFailed());
        }
        const data = response.body;
        dispatch(receiveTaggedPost(data));
      })
      .catch(err => {
        dispatch(receiveTaggedPostFailed(err));
      });
  };
}
const requestTaggedPost = () => {
  return { type: t.FETCH_TAGGED_POST_REQUEST };
};

const receiveTaggedPost = (data) => {
  return {
    type: t.FETCH_TAGGED_POST_SUCCESS,
    payload: data,
  };
};

const receiveTaggedPostFailed = (err) => ({
  type: t.FETCH_TAGGED_POST_FAILURE, error: err,
});
