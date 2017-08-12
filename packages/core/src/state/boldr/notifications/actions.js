/**
 * @module boldr-core/state/notifications/actions
 */
import uuid from 'uuid';
import * as t from '../actionTypes';

export function showNotification(options = {}) {
  return {
    type: t.SHOW_NOTIFICATION,
    options,
  };
}

export function hideNotification(uid) {
  return {
    type: t.HIDE_NOTIFICATION,
    uid,
  };
}

export function removeNotification(uid) {
  return {
    type: t.REMOVE_NOTIFICATION,
    uid,
  };
}

export function hideAllNotifications() {
  return {
    type: t.HIDE_ALL_NOTIFICATIONS,
  };
}

export function sendNotification(notification) {
  return {
    type: t.SEND_NOTIFICATION,
    notification: {
      ...notification,
      id: uuid.v4(),
    },
  };
}

/**
 * Dismiss a notification
 * @param {string}  id  the uuid of the notification to dismiss
 * @returns {Function} cleared notifs
 */
export const dismissNotification = id => {
  return {
    type: t.DISMISS_NOTIFICATION,
    id,
  };
};

export const clearNotification = () => {
  return { type: t.CLEAR_NOTIFICATION };
};
