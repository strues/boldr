import {
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
} from './attachments';

import {
  dashboardReducer,
  showSidebar,
  hideSidebar,
  fetchActivityIfNeeded,
  fetchActivity,
  fetchStatsIfNeeded,
  fetchStats,
} from './dashboard';

import {
  membersReducer,
  fetchMembers,
  fetchMembersIfNeeded,
  updateMember,
  memberSelected,
} from './members';

import adminReducer from './reducer';

export default adminReducer;

export {
  adminReducer,
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
  dashboardReducer,
  showSidebar,
  hideSidebar,
  fetchActivityIfNeeded,
  fetchActivity,
  fetchStatsIfNeeded,
  fetchStats,
  membersReducer,
  fetchMembers,
  fetchMembersIfNeeded,
  updateMember,
  memberSelected,
};
