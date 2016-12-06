import * as api from 'core/api';
import { normalize } from 'normalizr';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { camelizeKeys } from 'humps';
import { Schemas } from 'core/services/schemas';
import { getArticles } from './article';
export const LOAD_TAG_REQUEST = 'LOAD_TAG_REQUEST';
export const LOAD_TAG_SUCCESS = 'LOAD_TAG_SUCCESS';
export const LOAD_TAG_FAILURE = 'LOAD_TAG_FAILURE';
export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

const requestTag = () => {
  return {
    type: LOAD_TAG_REQUEST,
  };
};

const receiveTag = (response) => ({
  type: LOAD_TAG_SUCCESS,
  result: response.body,
});

const failedToReceiveTag = (err) => ({
  type: LOAD_TAG_FAILURE,
  error: err,
});

export function requestPostTags(tagName) {
  return dispatch => {
    console.log(tagName);
    dispatch(requestTag());
    return api.doFetchTags(tagName)
      .then(response => dispatch(receiveTag(response)))
      .catch(err => {
        dispatch(failedToReceiveTag(err));
      });
  };
}

// export function loadTags() {
//   return dispatch => {
//     dispatch(startLoadTags());
//     return api.getAllTags()
//       .then(response => {
//         const camelizeThis = response.body.results;
//
//         const camelizedJson = camelizeKeys(camelizeThis);
//         const normalizedResponse = normalize(camelizedJson, Schemas.TAG_ARRAY);
//         return dispatch(successLoadTags(normalizedResponse));
//       })
//       .catch(error => {
//         dispatch(errorLoadTags(error));
//       });
//   };
// }

// export function loadTagsIfNeeded() {
//   return (dispatch, getState) => {
//     if (shouldLoadTags(getState())) {
//       return dispatch(loadTags());
//     }
//
//     return Promise.resolve();
//   };
// }
//
// function shouldLoadTags(state) {
//   const tags = state.blog.tags;
//   if (!tags.length) {
//     return true;
//   }
//   if (tags.length) {
//     return false;
//   }
//   return tags;
// }
//
// function startLoadTags() {
//   return {
//     type: FETCH_TAGS_REQUEST,
//   };
// }
//
// function errorLoadTags(error) {
//   return {
//     type: FETCH_TAGS_FAILURE,
//     error,
//   };
// }
//
// function successLoadTags(normalizedResponse) {
//   return {
//     type: FETCH_TAGS_SUCCESS,
//     payload: normalizedResponse,
//   };
// }
//
// export const getTags = createSelector(
//   [
//     (state) => state.blog.tags.ids,
//     (state) => state.blog.tags.byId,
//   ],
//   (ids, byId) => ids.map(s => byId[s]),
// );
// export const getTagsForPost = createSelector(
//   [
//     getTags,
//     getArticles,
//   ],
//   (tags, posts) => posts.map(p => p)
// );
const INITIAL_STATE = {
  loading: false,
  error: false,
  id: '',
  name: '',
  description: '',
  posts: [],
};

/**
 * Blog Reducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */

//  export const getTagsForPost = (state) => state.posts.ids.map(id => state.posts.byId[id]);
//  const byId = (state = {}, action) => {
//    let nextState;
//    switch (action.type) {
//      case LOAD_POSTS_SUCCESS:
//
//        for (const prop in action.payload.entities.tags) {
//          if (action.payload.entities.tags.hasOwnProperty(prop)) {
//            Object.assign(action.payload.entities.tags[prop]);
//          }
//        }
//
//        return {
//          ...state,
//          ...action.payload.entities.tags
//        };
//      default:
//        return state;
//    }
//  };
//
//  const ids = (state = [], action) => {
//    switch (action.type) {
//      case LOAD_POSTS_SUCCESS:
//        return [...state, ...action.payload.result];
//
//      case FETCH_POST_SUCCESS:
//        return [...state, action.payload.result];
//
//      default:
//        return state;
//    }
//  };
//
// export default combineReducers({

export default function tagsReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOAD_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        id: action.result.id,
        name: action.result.name,
        posts: action.result.posts,
        description: action.result.description,
      };
    case LOAD_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
//
// const byId = (state = { loaded: false }, action) => {
//   switch (action.type) {
//     case FETCH_TAGS_SUCCESS:
//       Object.keys(action.payload.entities.tags).forEach(id => {
//         Object.assign(action.payload.entities.tags[id]);
//       });
//       return {
//         ...state,
//         ...action.payload.entities.tags,
//         loaded: true,
//
//       };
//     default:
//       return state;
//   }
// };
//
// const ids = (state = [], action) => {
//   switch (action.type) {
//     case FETCH_TAGS_SUCCESS:
//       return [...state, ...action.payload.result];
//     default:
//       return state;
//   }
// };
//
// const tagsReducer = combineReducers({
//   byId,
//   ids,
// });
// export default tagsReducer;
