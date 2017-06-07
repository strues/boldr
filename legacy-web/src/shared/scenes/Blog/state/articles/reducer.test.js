import { FETCH_ARTICLES_REQUEST, FETCH_ARTICLE_FAILURE } from '../actionTypes';
import articlesReducer from './reducer';

describe('Post reducer', () => {
  it('Should return the initial state', () => {
    expect(articlesReducer(undefined, {})).toEqual({
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: false,
    });
  });
  it('should initiate loading', () => {
    const initialState = {
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: false,
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: true,
    };
    expect(
      articlesReducer(initialState, {
        type: FETCH_ARTICLES_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle loading failure', () => {
    const initialState = {
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: false,
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentArticle: {},
      isFetching: false,
    };
    expect(
      articlesReducer(initialState, {
        type: FETCH_ARTICLE_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
