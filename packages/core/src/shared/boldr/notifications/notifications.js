import uuid from 'uuid';

export const SEND_NOTIFICATION = '@boldr/SEND_NOTIFICATION';
export const DISMISS_NOTIFICATION = '@boldr/DISMISS_NOTIFICATION';
export const CLEAR_NOTIFICATION = '@boldr/CLEAR_NOTIFICATION';
export const SHOW_NOTIFICATION = '@boldr/SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = '@boldr/HIDE_NOTIFICATION';
export const REMOVE_NOTIFICATION = '@boldr/REMOVE_NOTIFICATION';
export const HIDE_ALL_NOTIFICATIONS = '@boldr/HIDE_ALL_NOTIFICATIONS';

export function showNotification(options = {}) {
  return {
    type: SHOW_NOTIFICATION,
    options,
  };
}

export function hideNotification(uid) {
  return {
    type: HIDE_NOTIFICATION,
    uid,
  };
}

export function removeNotification(uid) {
  return {
    type: REMOVE_NOTIFICATION,
    uid,
  };
}

export function hideAllNotifications() {
  return {
    type: HIDE_ALL_NOTIFICATIONS,
  };
}

export function sendNotification(notification) {
  return {
    type: SEND_NOTIFICATION,
    notification: {
      ...notification,
      id: uuid.v4(),
    },
  };
}
/**
 * Dismiss a notification
 * @param {string}  id  the uuid of the notification to dismiss
 */
export const dismissNotification = id => {
  return {
    type: DISMISS_NOTIFICATION,
    id,
  };
};

/**
 * Clear all notifications
 */
export const clearNotification = () => {
  return { type: CLEAR_NOTIFICATION };
};

export const initialState = [];

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return state.concat({
        uid: action.options.uid || Date.now(),
        isVisible: true,
        options: action.options,
      });
    case HIDE_NOTIFICATION:
      return state.map(notification => {
        if (notification.uid === action.uid) {
          return {
            ...notification,
            isVisible: false,
          };
        }
        return notification;
      });
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.uid !== action.uid);
    case HIDE_ALL_NOTIFICATIONS:
      return state.map(notification => ({
        ...notification,
        isVisible: false,
      }));
    default:
      return state;
  }
}
