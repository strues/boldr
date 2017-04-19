import mediaReducer, {STATE_KEY, getMediaType} from './reducer';
import {
  fetchMediaIfNeeded,
  toggleMedia,
  selectMedia,
  editMedia,
  deleteMedia,
} from './actions';
import {getMedia} from './selectors';

export default mediaReducer;

export {
  STATE_KEY,
  fetchMediaIfNeeded,
  getMedia,
  getMediaType,
  selectMedia,
  toggleMedia,
  editMedia,
  deleteMedia,
};
