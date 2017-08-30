import { createSelector } from 'reselect';

export const selectBoldr = state => state.boldr;
export const selectAdmin = state => state.admin;

export const selectDashboard = () =>
  createSelector(selectAdmin, adminState => adminState.dashboard);

export const selectRouter = state => state.router;

export const selectUi = () => createSelector(selectBoldr, boldrState => boldrState.ui);
