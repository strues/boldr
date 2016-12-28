import * as t from './constants';
import pagesReducer from './pages';

describe('Pages Duck', () => {
  it('Should return the initial state', () => {
    expect(
        pagesReducer(undefined, {}),
      ).toEqual({
        loaded: false,
        byLabel: {},
        labels: [],
        meta: {},
        filter: {},
      });
  });
  it('should initiate loading', () => {
    const initialState = {
      loaded: false,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: true,
      loaded: false,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.FETCH_PAGES_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should initiate loading', () => {
    const initialState = {
      loaded: false,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: true,
      loaded: false,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.FETCH_PAGE_REQUEST,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle failure', () => {
    const initialState = {
      loaded: false,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: false,
      loaded: true,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.FETCH_PAGE_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
  it('should handle failure', () => {
    const initialState = {
      loaded: false,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    const stateAfter = {
      loading: false,
      loaded: true,
      byLabel: {},
      labels: [],
      meta: {},
      filter: {},
    };
    expect(
      pagesReducer(initialState, {
        type: t.FETCH_PAGES_FAILURE,
      }),
    ).toEqual(stateAfter);
  });
});
