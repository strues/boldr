import uuid from 'uuid';

export const SEND_NOTIFICATION = '@boldr/SEND_NOTIFICATION';
export const DISMISS_NOTIFICATION = '@boldr/DISMISS_NOTIFICATION';
export const CLEAR_NOTIFICATION = '@boldr/CLEAR_NOTIFICATION';

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

/**
 * reducer for the app-wide notifications.
 * @method notificationReducer
 * @param  {Array}             [state=[]] Empty state array, meant to hold all
 * notification objects.
 * @param  {Object}            action     the action object
 */
export const initialState = [];
export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return [...state, action.notification];
    case DISMISS_NOTIFICATION:
      return state.filter(notification => notification.id !== action.id);
    case CLEAR_NOTIFICATION:
      return [];
    default:
      return state;
  }
}
