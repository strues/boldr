// @flow
/**
 * @module @boldr/core/shared/state/boldr/notifications/reducer
 */
import nanoid from 'nanoid';
import * as t from '../actionTypes';
import type { NotificationsState, Action } from '../../../../types';

type State = NotificationsState;

export const initialState = [];

export default function notificationsReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case t.SEND_NOTIFICATION:
      return state.concat({
        uid: action.options.uid || nanoid(),
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
    case t.CLEAR_NOTIFICATIONS:
      return state.map(notification => ({
        ...notification,
        isVisible: false,
      }));
    default:
      return state;
  }
}
