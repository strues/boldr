// @flow
/**
 * @module boldr-core/state/notifications/actions
 */
import * as t from '../actionTypes';
import type { NotificationPayload } from '../../../types';

export function sendNotification(options: NotificationPayload = {}) {
  return {
    type: t.SEND_NOTIFICATION,
    options,
  };
}

export function hideNotification(uid: string) {
  return {
    type: t.HIDE_NOTIFICATION,
    uid,
  };
}

export function removeNotification(uid: string) {
  return {
    type: t.REMOVE_NOTIFICATION,
    uid,
  };
}

export function clearNotifications() {
  return {
    type: t.CLEAR_NOTIFICATIONS,
  };
}
