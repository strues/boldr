import {combineReducers} from 'redux';
import addIdToArray from 'boldr-utils/es/arrays/addIdToArray';
import removeByKey from 'boldr-utils/es/objects/removeByKey';
import removeIdFromArray from 'boldr-utils/es/arrays/removeIdFromArray';

import * as t from '../actionTypes';
import {
  FETCH_MEDIAS_REQUEST,
  FETCH_MEDIAS_SUCCESS,
  FETCH_MEDIAS_FAILURE,
  EDIT_MEDIA_REQUEST,
  EDIT_MEDIA_SUCCESS,
  EDIT_MEDIA_FAILURE,
  SELECT_MEDIA,
} from './actions';
import {getMedia} from './selectors';

export const STATE_KEY = 'media';

const all = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MEDIAS_SUCCESS:
    case EDIT_MEDIA_SUCCESS:
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
    case EDIT_MEDIA_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_MEDIAS_REQUEST:
    case EDIT_MEDIA_REQUEST:
      return true;
    case FETCH_MEDIAS_SUCCESS:
    case FETCH_MEDIAS_FAILURE:
    case EDIT_MEDIA_SUCCESS:
    case EDIT_MEDIA_FAILURE:
      return false;
    default:
      return state;
  }
};

const currentMedia = (state = {}, action) => {
  switch (action.type) {
    case SELECT_MEDIA:
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
