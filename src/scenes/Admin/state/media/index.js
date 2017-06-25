import mediaReducer, { getMediaType } from './reducer';
import {
  toggleMedia,
  selectMedia,
  editMedia,
  deleteMedia,
  uploadMediaUrl,
  uploadMediaFile,
} from './actions';
import { getMedia } from './selectors';

export default mediaReducer;

export {
  mediaReducer,
  getMedia,
  getMediaType,
  selectMedia,
  toggleMedia,
  editMedia,
  deleteMedia,
  uploadMediaFile,
  uploadMediaUrl,
};
