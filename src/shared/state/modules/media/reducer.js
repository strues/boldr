import { combineReducers } from 'redux';
import addIdToArray from 'boldr-utils/es/arrays/addIdToArray';
import removeByKey from 'boldr-utils/es/objects/removeByKey';
import removeIdFromArray from 'boldr-utils/es/arrays/removeIdFromArray';
import * as t from './actionTypes';

import { getMedia } from './selectors';

export const STATE_KEY = 'media';

const all = (state = {}, action) => {
  switch (action.type) {
    case t.FETCH_MEDIAS_SUCCESS:
    case t.EDIT_MEDIA_SUCCESS:
    case t.UPLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        ...action.payload.entities.media,
      };
    case t.DELETE_MEDIA_SUCCESS:
      return removeByKey(state, action.id);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case t.FETCH_MEDIAS_SUCCESS:
    case t.EDIT_MEDIA_SUCCESS:
      return action.payload.result;
    case t.UPLOAD_MEDIA_SUCCESS:
      return addIdToArray(state, action.payload.result);
    case t.DELETE_MEDIA_SUCCESS:
      return removeIdFromArray(state, action.id);
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case t.FETCH_MEDIAS_REQUEST:
    case t.EDIT_MEDIA_REQUEST:
    case t.UPLOAD_MEDIA_REQUEST:
      return true;
    case t.FETCH_MEDIAS_SUCCESS:
    case t.FETCH_MEDIAS_FAILURE:
    case t.EDIT_MEDIA_SUCCESS:
    case t.EDIT_MEDIA_FAILURE:
    case t.UPLOAD_MEDIA_FAILURE:
    case t.UPLOAD_MEDIA_SUCCESS:
      return false;
    default:
      return state;
  }
};

const currentMedia = (state = {}, action) => {
  switch (action.type) {
    case t.SELECT_MEDIA:
      return {
        ...state,
        ...action.file,
      };
    default:
      return state;
  }
};

export default combineReducers({
  all,
  ids,
  isFetching,
  currentMedia,
});

export const getMediaType = (state: Object, filter: string): Function => {
  const allMedia = getMedia(state);
  switch (filter) {
    case 'all':
      return allMedia;
    case 'image':
      return allMedia.filter(m => m.type.mediaType[filter]);
    case 'video':
      return allMedia.filter(m => !m.type.mediaType);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
