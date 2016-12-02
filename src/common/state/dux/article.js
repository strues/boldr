import { normalize } from 'normalizr';
import { combineReducers } from 'redux';
import { camelizeKeys } from 'humps';
import * as api from 'core/api';
import { Schemas } from 'core/services/schemas';

export const LOAD_ARTICLES_REQUEST = '@boldr/LOAD_ARTICLES_REQUEST';
export const LOAD_ARTICLES_SUCCESS = '@boldr/LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_FAILURE = '@boldr/LOAD_ARTICLES_FAILURE';

export function loadArticles() {
  return dispatch => {
    dispatch(startLoadArticles());
    return api.getAllPosts()
      .then(response => {
        const camelizeThis = response.body.results;

        const camelizedJson = camelizeKeys(camelizeThis);
        const normalized = normalize(camelizedJson, Schemas.POST_ARRAY);
        return dispatch(successLoadArticles(normalized));
      })
      .catch(error => {
        dispatch(errorLoadArticles(error));
      });
  };
}

export function loadArticlesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldLoadArticles(getState())) {
      return dispatch(loadArticles());
    }

    return Promise.resolve();
  };
}

function shouldLoadArticles(state) {
  const articles = state.articles;
  if (!articles.length) {
    return true;
  }
  if (articles.length) {
    return false;
  }
  return articles;
}

function startLoadArticles() {
  return {
    type: LOAD_ARTICLES_REQUEST,
  };
}

function errorLoadArticles(error) {
  return {
    type: LOAD_ARTICLES_FAILURE,
    error,
  };
}

function successLoadArticles(normalized) {
  return {
    type: LOAD_ARTICLES_SUCCESS,
    payload: normalized,
  };
}

const bySlug = (state = { loaded: false }, action) => {
  switch (action.type) {
    case LOAD_ARTICLES_SUCCESS:
      Object.keys(action.payload.entities.posts).forEach(slug => {
        Object.assign(action.payload.entities.posts[slug]);
      });
      return {
        ...state,
        ...action.payload.entities.posts,
        loaded: true,

      };
    default:
      return state;
  }
};

const slugs = (state = [], action) => {
  switch (action.type) {
    case LOAD_ARTICLES_SUCCESS:
      return [...state, ...action.payload.result];
    default:
      return state;
  }
};
// const postsByTag = (state = {}, action) => {
//   switch (action.type) {
//     case LOAD_ARTICLES_SUCCESS:
//     case LOAD_ARTICLES_REQUEST:
//       return {
//         ...state,
//         [action.tag || 'all']: bySlug(state[action.tag], action),
//       };
//     default:
//       return state;
//   }
// };
const articlesReducer = combineReducers({
  bySlug,
  slugs,
});

export default articlesReducer;
