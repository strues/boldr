import { createSelector } from 'reselect';

export const selectArticleForm = state => state.form.articleForm;

export const selectArticleFormValues = createSelector(
  selectArticleForm,
  form => form && form.values,
);

export const selectArticleFormSyncErrors = createSelector(
  selectArticleForm,
  form => (form.syncErrors && form.syncErrors) || false,
);
