import { dashboardReducer, showSidebar, hideSidebar } from './dashboard';

import { membersReducer, updateMember, memberSelected } from './members';

import adminReducer from './reducer';

export default adminReducer;

export {
  adminReducer,
  dashboardReducer,
  showSidebar,
  hideSidebar,
  membersReducer,
  updateMember,
  memberSelected,
};
