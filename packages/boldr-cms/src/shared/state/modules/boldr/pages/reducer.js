import { combineReducers } from 'redux';
import * as t from '../../actionTypes';

export const STATE_KEY = 'pages';

/**
  * PAGE REDUCER
  * -------------------------
  * @exports pagesReducer
  *****************************************************************/

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_PAGES_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.pages,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_PAGES_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_PAGES_REQUEST:
    case t.FETCH_PAGE_REQUEST:
      return true;
    case t.FETCH_PAGES_SUCCESS:
    case t.FETCH_PAGE_SUCCESS:
      return false;
    default:
      return state;
  }
};
//
// const currentTemplate = (state = {}, action) => {
//   switch (action.type) {
//     case t.SELECT_POST:
//       return {
//         ...state,
//         ...action.post,
//       };
//     default:
//       return state;
//   }
// };

/**
 *  postsReducer
 * @param  {Object} state       The initial state
 * @param  {Object} action      The action object
 */

export default combineReducers({
  all,
  ids,
  isFetching,
});
