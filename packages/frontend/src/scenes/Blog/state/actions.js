/* @flow */
import type { ArticleType, Tag } from '../../../types/boldr';
import * as t from './actionTypes';

export function togglePostLayoutView() {
  return { type: t.TOGGLE_POST_LAYOUT };
}

export function selectArticle(article: ArticleType) {
  return {
    type: t.SELECT_ARTICLE,
    article,
  };
}

export function selectTag(tag: Tag) {
  return {
    type: t.SELECT_TAG,
    tag,
  };
}

export function clearTag() {
  return {
    type: t.CLEAR_TAG,
  };
}
