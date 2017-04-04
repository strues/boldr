import { createSelector } from 'reselect';

/**
  * TAG SELECTORS
  *
  *****************************************************************/

export const getTemplateIds = state => state.blog.templates.ids;
export const getTemplatesList = state => state.blog.templates.all;

export const getTemplates = createSelector([getTemplateIds, getTemplatesList], (ids, all) => ids.map(id => all[id]));
