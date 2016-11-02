import * as t from './constants';

/**
  * PAGE REDUCER
  * -------------------------
  * @exports pagesReducer
  *****************************************************************/
const initialState = {
  loaded: false,
  all: {},
  ids: [],
  meta: {},
  filter: {}
};

export default function pagesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case t.LOAD_PAGES_REQUEST:
    case t.LOAD_PAGE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case t.LOAD_PAGES_SUCCESS:
      return {
        loading: false,
        loaded: true,
        all: action.payload.entities.pages,
        ids: action.payload.result
      };
    case t.LOAD_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case t.LOAD_PAGES_FAILURE:
    case t.LOAD_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.boldr.pages && globalState.boldr.pages.loaded;
}
