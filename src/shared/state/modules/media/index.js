import mediaReducer, { getMediaType } from './reducer';
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
