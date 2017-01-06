import postsReducer from './posts';
import { FETCH_POSTS_REQUEST, GET_POST_FAILURE } from './constants';

describe('Post Duck', () => {
  it('Should return the initial state', () => {
    expect(
        postsReducer(undefined, {}),
      ).toEqual({
        all: {},
        ids: [],
        currentPost: {},
        isFetching: false,
        posts: {
          bySlug: {},
          list: [],
          loading: false,
          loaded: false,
          error: null,
        },
      });
  });
  it('should initiate loading', () => {
    const initialState = {
      all: {},
      ids: [],
      currentPost: {},
      isFetching: false,
      posts: {
        bySlug: {},
        list: [],
        loading: false,
        loaded: false,
        error: null,
      },
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentPost: {},
      isFetching: true,
      posts: {
        bySlug: {},
        list: [],
        loading: true,
        loaded: false,
        error: null,
      },
    };
    expect(
      postsReducer(initialState, {
        type: FETCH_POSTS_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle loading failure', () => {
    const initialState = {
      all: {},
      ids: [],
      currentPost: {},
      isFetching: false,
      posts: {
        bySlug: {},
        list: [],
        loading: false,
        loaded: false,
        error: null,
      },
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentPost: {},
      isFetching: false,
      posts: {
        bySlug: {},
        list: [],
        loading: false,
        loaded: true,
        error: undefined,
      },
    };
    expect(
      postsReducer(initialState, {
        type: GET_POST_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
