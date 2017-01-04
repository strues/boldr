import { combineReducers } from 'redux';
import * as t from './constants';

const INITIAL_STATE = {
  id: -1,
  uuid: '',
  name: '',
  label: '',
  attributes: {},
  restricted: false,
  order: -1,
  details: [{
    id: -1,
    uuid: '',
    label: '',
    name: '',
    attribute: '',
    position: '',
    parent_id: '',
    link: '',
    icon: '',
  }],
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
        label: action.payload.label,
        attributes: action.payload.attributes,
        restricted: action.payload.restricted,
        order: action.payload.order,
        details: action.payload.details,
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
