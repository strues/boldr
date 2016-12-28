
import * as t from './constants';

/**
  * PAGE REDUCER
  * -------------------------
  * @exports pagesReducer
  *****************************************************************/
const initialState = {
  loaded: false,
  byLabel: {},
  labels: [],
  meta: {},
  filter: {},
};

export default function pagesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case t.FETCH_PAGES_REQUEST:
    case t.FETCH_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case t.FETCH_PAGES_SUCCESS:
      return {
        loading: false,
        loaded: true,
        byLabel: action.payload.entities.pages,
        labels: action.payload.result,
      };
    case t.FETCH_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      };
    case t.FETCH_PAGES_FAILURE:
    case t.FETCH_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.boldr.pages && globalState.boldr.pages.loaded;
}
