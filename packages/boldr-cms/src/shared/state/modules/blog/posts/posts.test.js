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
      });
  });
  it('should initiate loading', () => {
    const initialState = {
      all: {},
      ids: [],
      currentPost: {},
      isFetching: false,
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentPost: {},
      isFetching: true,
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
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentPost: {},
      isFetching: false,
    };
    expect(
      postsReducer(initialState, {
        type: GET_POST_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
