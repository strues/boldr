/**
 * @module boldr-core/state/notifications/reducer
 */
import * as t from '../actionTypes';

export const initialState = [];

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case t.SHOW_NOTIFICATION:
      return state.concat({
        uid: action.options.uid || Date.now(),
        isVisible: true,
        options: action.options,
      });
    case t.HIDE_NOTIFICATION:
      return state.map(notification => {
        if (notification.uid === action.uid) {
          return {
            ...notification,
            isVisible: false,
          };
        }
        return notification;
      });
    case t.REMOVE_NOTIFICATION:
      return state.filter(notification => notification.uid !== action.uid);
    case t.HIDE_ALL_NOTIFICATIONS:
      return state.map(notification => ({
        ...notification,
        isVisible: false,
      }));
    default:
      return state;
  }
}
