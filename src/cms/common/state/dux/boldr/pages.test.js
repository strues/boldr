import * as t from './constants';
import pagesReducer from './pages';

describe('Pages Duck', () => {
  it('Should return the initial state', () => {
    expect(
        pagesReducer(undefined, {}),
      ).toEqual({
        loaded: false,
        all: {},
        ids: [],
        meta: {},
        filter: {},
      });
  });
  it('should initiate loading', () => {
    const initialState = {
      loaded: false,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: true,
      loaded: false,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.LOAD_PAGES_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should initiate loading', () => {
    const initialState = {
      loaded: false,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: true,
      loaded: false,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.LOAD_PAGE_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle failure', () => {
    const initialState = {
      loaded: false,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: false,
      loaded: true,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.LOAD_PAGE_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle failure', () => {
    const initialState = {
      loaded: false,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: false,
      loaded: true,
      all: {},
      ids: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.LOAD_PAGES_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
