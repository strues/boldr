import { createSelector } from 'reselect';

export const selectAuth = (state) => state.account.auth;
export const selectUser = (state) => state.account.user;
export const selectProfile = (state) => state.account.profile;

export const makeSelectCurrentProfile = () => createSelector(
  selectProfile,
  (accountState) => accountState.profile.current
);

export const makeSelectAuth = () => createSelector(
  selectProfile,
  (accountState) => accountState.auth
);

export const makeSelectUser = () => createSelector(
  selectProfile,
  (accountState) => accountState.user
);
