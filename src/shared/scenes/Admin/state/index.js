import {
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
} from './attachments';

import {
  dashboardReducer,
  DASHBOARD_STATE_KEY,
  showSidebar,
  hideSidebar,
  fetchActivityIfNeeded,
  fetchActivity,
  fetchStatsIfNeeded,
  fetchStats,
} from './dashboard';

import {
  membersReducer,
  MEMBERS_STATE_KEY,
  fetchMembers,
  fetchMembersIfNeeded,
  updateMember,
  memberSelected,
} from './members';

import adminReducer, { STATE_KEY as ADMIN_STATE_KEY } from './reducer';

export default adminReducer;

export {
  adminReducer,
  ADMIN_STATE_KEY,
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
  dashboardReducer,
  DASHBOARD_STATE_KEY,
  showSidebar,
  hideSidebar,
  fetchActivityIfNeeded,
  fetchActivity,
  fetchStatsIfNeeded,
  fetchStats,
  membersReducer,
  MEMBERS_STATE_KEY,
  fetchMembers,
  fetchMembersIfNeeded,
  updateMember,
  memberSelected,
};
