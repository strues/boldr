import {
  attachmentReducer,
  uploadFiles,
  uploadArticleImage,
  deleteAttachment,
  updateAttachment,
  selectFile,
  uploadProfileImage,
  uploadAvatarImage,
} from './attachments';

import { dashboardReducer, showSidebar, hideSidebar } from './dashboard';

import { membersReducer, updateMember, memberSelected } from './members';

import adminReducer from './reducer';

export default adminReducer;

export {
  adminReducer,
  attachmentReducer,
  uploadFiles,
  uploadArticleImage,
  deleteAttachment,
  updateAttachment,
  selectFile,
  uploadProfileImage,
  uploadAvatarImage,
  dashboardReducer,
  showSidebar,
  hideSidebar,
  membersReducer,
  updateMember,
  memberSelected,
};
