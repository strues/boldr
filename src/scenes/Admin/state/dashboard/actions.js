import * as t from '../actionTypes';

export const showSidebar = () => ({ type: t.SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: t.HIDE_SIDEBAR });

export const setArticle = article => ({ type: t.SET_ARTICLE, article });
