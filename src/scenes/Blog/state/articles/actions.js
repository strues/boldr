/* @flow */
import { sendNotification } from '../../../../state/notifications/notifications';
import { API_PREFIX } from '../../../../core';
import * as notif from '../../../../core/constants';
import * as t from '../actionTypes';

export function togglePostLayoutView() {
  return { type: t.TOGGLE_POST_LAYOUT };
}

export function selectArticle(post: Object) {
  return {
    type: t.SELECT_ARTICLE,
    post,
  };
}
