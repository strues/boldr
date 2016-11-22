import * as api from 'core/services/api';

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

const receiveTag = (json) => ({
  type: LOAD_TAG_SUCCESS,
  result: json,
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
      .then(json => dispatch(receiveTag(json)))
      .catch(err => {
        dispatch(failedToReceiveTag(err));
      });
  };
}


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
