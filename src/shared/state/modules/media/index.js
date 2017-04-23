import mediaReducer, {
  STATE_KEY as MEDIA_STATE_KEY,
  getMediaType,
} from './reducer';
import {
  fetchMediaIfNeeded,
  toggleMedia,
  selectMedia,
  editMedia,
  deleteMedia,
  uploadMediaFile,
} from './actions';
import { getMedia } from './selectors';
import { media, arrayOfMedia } from './schema';

export default mediaReducer;

export {
  mediaReducer,
  MEDIA_STATE_KEY,
  fetchMediaIfNeeded,
  getMedia,
  getMediaType,
  selectMedia,
  toggleMedia,
  editMedia,
  deleteMedia,
  uploadMediaFile,
  media,
  arrayOfMedia,
};
