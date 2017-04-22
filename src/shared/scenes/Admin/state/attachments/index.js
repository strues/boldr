import attachmentReducer, {
  STATE_KEY as ATTACHMENT_STATE_KEY,
} from './reducer';
import {
  fetchAttachments,
  fetchAttachmentsIfNeeded,
  uploadFiles,
  uploadPostImage,
  deleteAttachment,
  updateAttachment,
  selectFile,
  uploadProfileImage,
  uploadAvatarImage,
} from './actions';

export default attachmentReducer;

export {
  attachmentReducer,
  ATTACHMENT_STATE_KEY,
  fetchAttachments,
  fetchAttachmentsIfNeeded,
  uploadFiles,
  uploadPostImage,
  deleteAttachment,
  updateAttachment,
  selectFile,
  uploadProfileImage,
  uploadAvatarImage,
};
