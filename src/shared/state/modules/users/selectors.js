import {createSelector} from 'reselect';

export const selectUsers = state => state.users;
export const selectMe = state => state.users.me;
export const selectProfile = state => state.users.profile;

export const makeSelectCurrentProfile = () =>
  createSelector(selectProfile, accountState => accountState.profile.current);

export const makeSelectAuth = () =>
  createSelector(selectProfile, accountState => accountState.auth);

export const makeSelectUser = () =>
  createSelector(selectProfile, accountState => accountState.user);
