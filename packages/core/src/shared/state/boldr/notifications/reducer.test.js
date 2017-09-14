import {
  SEND_NOTIFICATION,
  HIDE_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from '../actionTypes';
import notificationsReducer, { initialState } from './reducer';
import {
  sendNotification,
  hideNotification,
  clearNotifications,
  removeNotification,
} from './actions';

describe('notifications reducer', () => {
  const uid = 'testUid';
  it('returns the initial state', () => {
    expect(notificationsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle sendNotification properly', () => {
    const options = { uid };
    const expected = [...initialState, { uid, options, isVisible: true }];
    expect(notificationsReducer(initialState, sendNotification(options))).toEqual(expected);
  });

  it('should handle hideNotification properly', () => {
    const testState = [{ uid, isVisible: true }];
    const expected = [{ uid, isVisible: false }];
    expect(notificationsReducer(testState, hideNotification(uid))).toEqual(expected);
  });

  it('should handle clearNotifications properly', () => {
    const testState = [{ uid: 1, isVisible: true }, { uid: 2, isVisible: true }];
    const expectedState = [{ uid: 1, isVisible: false }, { uid: 2, isVisible: false }];
    expect(notificationsReducer(testState, clearNotifications())).toEqual(expectedState);
  });

  it('should handle removeNotification properly', () => {
    const nonTargetNotification = { uid: 'aontherTestUid' };
    const testState = [{ uid }, nonTargetNotification];
    const expected = [nonTargetNotification];
    expect(notificationsReducer(testState, removeNotification(uid))).toEqual(expected);
  });
});

describe('notifications actions', () => {
  const uid = 'testUid';
  describe('sendNotification', () => {
    it('should return correct type and passed options object', () => {
      const options = {};
      const expected = { type: SEND_NOTIFICATION, options };
      expect(sendNotification(options)).toEqual(expected);
    });
  });

  describe('hideNotification', () => {
    it('should return correct type and passed uid', () => {
      const expected = { type: HIDE_NOTIFICATION, uid };
      expect(hideNotification(uid)).toEqual(expected);
    });
  });

  describe('clearNotifications', () => {
    it('should return correct type', () => {
      const expected = { type: CLEAR_NOTIFICATIONS };
      expect(clearNotifications()).toEqual(expected);
    });
  });

  describe('removeNotification', () => {
    it('should return correct type and passed uid', () => {
      const expected = { type: REMOVE_NOTIFICATION, uid };
      expect(removeNotification(uid)).toEqual(expected);
    });
  });
});
