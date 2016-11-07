
const NOTIFICATION_SEND = 'NOTIFICATION_SEND';
const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS';
const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR';

/**
 *  Send a notification out.
 */
export const notificationSend = (notification) => {
  const payload = Object.assign({}, notification);
  if (!payload.id) {
    payload.id = new Date().getTime();
  }
  return dispatch => {
    dispatch({ type: NOTIFICATION_SEND, payload });

    if (payload.dismissAfter) {
      setTimeout(() => {
        dispatch({
          type: NOTIFICATION_DISMISS,
          payload: payload.id,
        });
      }, payload.dismissAfter);
    }
  };
};

/**
 * Dismiss a notification
 * @param {Number}  id the notification  action id
 */
export const notificationDismiss = (id) => {
  return { type: NOTIFICATION_DISMISS, payload: id };
};

/**
 * Clear all notifications
 */
export const notificationClear = () => {
  return { type: NOTIFICATION_CLEAR };
};

/**
 * reducer for the app-wide notifications.
 * @method notificationReducer
 * @param  {Array}             [state=[]] Empty state array, meant to hold all notification objects.
 * @param  {Object}            action     the action object
 */
export default function notificationReducer(state = [], action) {
  if (!action || !action.type) {
    return state;
  }

  switch (action.type) {
    case NOTIFICATION_SEND:
      return [action.payload, ...state];
    case NOTIFICATION_DISMISS:
      return state.filter(notification =>
          notification.id !== action.payload,
      );
    case NOTIFICATION_CLEAR:
      return [];
    default:
      return state;
  }
}
