import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;
export const selectToken = () => createSelector(selectAuth, authState => authState.token);
export const selectCurrentUser = () => createSelector(selectAuth, authState => authState.info);
