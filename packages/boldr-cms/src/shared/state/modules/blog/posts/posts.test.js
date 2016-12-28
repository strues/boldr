import postsReducer from './posts';
import { FETCH_POSTS_REQUEST, GET_POST_FAILURE } from './constants';

describe('Post Duck', () => {
  it('Should return the initial state', () => {
    expect(
        postsReducer(undefined, {}),
      ).toEqual({
        loading: false,
        loaded: false,
        error: null,
        bySlug: {},
        list: [],
      });
  });
  it('should initiate loading', () => {
    const initialState = {
      loading: false,
      loaded: false,
      error: null,
      bySlug: {},
      list: [],
    };
    const stateAfter = {
      loading: true,
      loaded: false,
      error: null,
      bySlug: {},
      list: [],
    };
    expect(
      postsReducer(initialState, {
        type: FETCH_POSTS_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle loading failure', () => {
    const initialState = {
      loading: false,
      loaded: false,
      error: null,
      bySlug: {},
      list: [],
    };
    const stateAfter = {
      loading: false,
      loaded: true,
      error: undefined,
      bySlug: {},
      list: [],
    };
    expect(
      postsReducer(initialState, {
        type: GET_POST_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
