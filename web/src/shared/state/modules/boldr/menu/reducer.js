import { combineReducers } from 'redux';
import * as t from '../actionTypes';

const INITIAL_STATE = {
  id: -1,
  uuid: '',
  name: '',
  safeName: '',
  attributes: {},
  restricted: false,
  details: [],
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.GET_MAIN_MENU_REQUEST:
      return true;
    case t.GET_MAIN_MENU_SUCCESS:
    case t.GET_MAIN_MENU_FAILURE:
      return false;
    default:
      return state;
  }
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
        safeName: action.payload.label,
        restricted: action.payload.restricted,
        details: action.payload.details,
      };
    default:
      return state;
  }
};

const menuReducer = combineReducers({
  main,
  isFetching,
});

export default menuReducer;
