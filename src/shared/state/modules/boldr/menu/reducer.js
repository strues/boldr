import { combineReducers } from 'redux';
import * as t from '../constants';

export const STATE_KEY = 'menu';

const INITIAL_STATE = {
  id: -1,
  uuid: '',
  name: '',
  safe_name: '',
  attributes: {},
  restricted: false,
  details: [],
};

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.GET_MAIN_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        id: action.payload.id,
        uuid: action.payload.uuid,
        name: action.payload.name,
        safe_name: action.payload.label,
        restricted: action.payload.restricted,
        details: action.payload.details,
        // details(undefined, action)
      };
    // case t.UPDATE_MENU_SUCCESS:
    //   return {
    //     ...state,
    //     details: [
    //       ...state.details.slice(0, action.payload)
    //     ]
    //   };
    default:
      return state;
  }
};

const menuReducer = combineReducers({
  main,
});

export default menuReducer;
