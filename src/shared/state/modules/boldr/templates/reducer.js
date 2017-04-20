import { combineReducers } from 'redux';
import * as t from '../constants';

export const STATE_KEY = 'templates';

/**
  * PAGE REDUCER
  * -------------------------
  * @exports pagesReducer
  *****************************************************************/

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_TEMPLATES_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.templates,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_TEMPLATES_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_TEMPLATES_REQUEST:
    case t.FETCH_TEMPLATE_REQUEST:
      return true;
    case t.FETCH_TEMPLATES_SUCCESS:
    case t.FETCH_TEMPLATE_SUCCESS:
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
