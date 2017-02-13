import { createSelector } from 'reselect';

export const selectAuth = (state) => state.auth;

export const makeSelectAuth = () => createSelector(
  selectProfile,
  (authState) => authState
);
