import attachmentReducer from './reducer';
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

export {
  attachmentReducer,
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

export default attachmentReducer;
