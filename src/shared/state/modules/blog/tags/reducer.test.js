import {FETCH_TAGS_REQUEST, FETCH_TAGS_FAILURE} from '../../actionTypes';
import tagsReducer from './reducer';

describe('Tags', () => {
  it('Should return the initial state', () => {
    expect(tagsReducer(undefined, {})).toEqual({
      all: {},
      ids: [],
      isFetching: false,
      currentTag: {},
    });
  });
  it('should initiate loading', () => {
    const initialState = {
      all: {},
      ids: [],
      currentTag: {},
      isFetching: false,
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentTag: {},
      isFetching: true,
    };
    expect(
      tagsReducer(initialState, {
        type: FETCH_TAGS_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle loading failure', () => {
    const initialState = {
      all: {},
      ids: [],
      currentTag: {},
      isFetching: false,
    };
    const stateAfter = {
      all: {},
      ids: [],
      currentTag: {},
      isFetching: false,
    };
    expect(
      tagsReducer(initialState, {
        type: FETCH_TAGS_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
