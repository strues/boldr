import attachmentReducer, {STATE_KEY} from './reducer';
import {
  uploadAvatarImage,
  uploadProfileImage,
  uploadPostImage,
  fetchAttachmentsIfNeeded,
  deleteAttachment,
  updateAttachment,
} from './actions';

export default attachmentReducer;

export {
  STATE_KEY,
  uploadAvatarImage,
  uploadProfileImage,
  uploadPostImage,
  fetchAttachmentsIfNeeded,
  deleteAttachment,
  updateAttachment,
};
