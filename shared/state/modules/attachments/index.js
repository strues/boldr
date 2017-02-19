import attachmentReducer, { STATE_KEY } from './reducer';
import {
  uploadAvatarImage,
  uploadProfileImage,
  uploadPostImage,
} from './actions';

export default attachmentReducer;

export {
  STATE_KEY,
  uploadAvatarImage,
  uploadProfileImage,
  uploadPostImage,
 };
