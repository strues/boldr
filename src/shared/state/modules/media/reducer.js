import { combineReducers } from 'redux';
import addIdToArray from 'boldr-utils/es/arrays/addIdToArray';
import removeByKey from 'boldr-utils/es/objects/removeByKey';
import removeIdFromArray from 'boldr-utils/es/arrays/removeIdFromArray';

import * as t from '../actionTypes';
import { FETCH_MEDIAS_REQUEST, FETCH_MEDIAS_SUCCESS, FETCH_MEDIAS_FAILURE } from './actions';

export const STATE_KEY = 'media';

const all = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MEDIAS_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.media,
      };

    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_MEDIAS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_MEDIAS_REQUEST:
      return true;
    case FETCH_MEDIAS_SUCCESS:
    case FETCH_MEDIAS_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  all,
  ids,
  isFetching,
});
