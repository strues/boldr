import { createSelector } from 'reselect';

export const selectRouter = state => state.router;
export const selectBoldr = state => state.boldr;
export const selectAdmin = state => state.admin;

export const selectDashboard = () =>
  createSelector(selectAdmin, adminState => adminState.dashboard);

export const selectUi = () => createSelector(selectBoldr, boldrState => boldrState.ui);

export const makeSelectModal = () =>
  createSelector(selectBoldr, boldrState => boldrState.ui.isModalVisible);

export const makeSelectCurrentMember = () =>
  createSelector(selectAdmin, adminState => adminState.members.currentMember);
