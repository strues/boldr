import { combineReducers } from 'redux';
import * as t from './actionTypes';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.EDIT_MEDIA_SUCCESS:
    case t.UPLOAD_MEDIA_SUCCESS:
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
    case t.EDIT_MEDIA_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.EDIT_MEDIA_REQUEST:
    case t.UPLOAD_MEDIA_REQUEST:
      return true;
    case t.EDIT_MEDIA_SUCCESS:
    case t.EDIT_MEDIA_FAILURE:
    case t.UPLOAD_MEDIA_FAILURE:
    case t.UPLOAD_MEDIA_SUCCESS:
      return false;
    default:
      return state;
  }
};

const currentMedia = (state = { uploadMedia: { name: '' } }, action) => {
  switch (action.type) {
    case t.SELECT_MEDIA:
      return {
        ...state,
        ...action.file,
      };
    case t.SET_MEDIA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

const mediaReducer = combineReducers({
  all,
  ids,
  isFetching,
  currentMedia,
});

export default mediaReducer;
