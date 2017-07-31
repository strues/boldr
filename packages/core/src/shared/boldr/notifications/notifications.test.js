import notificationsReducer, {
  initialState,
  showNotification,
  hideNotification,
  hideAllNotifications,
  removeNotification,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  REMOVE_NOTIFICATION,
  HIDE_ALL_NOTIFICATIONS,
} from './notifications';

describe('notifications reducer', () => {
  const uid = 'testUid';
  it('returns the initial state', () => {
    expect(notificationsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle showNotification properly', () => {
    const options = { uid };
    const expected = [...initialState, { uid, options, isVisible: true }];
    expect(notificationsReducer(initialState, showNotification(options))).toEqual(expected);
  });

  it('should handle hideNotification properly', () => {
    const testState = [{ uid, isVisible: true }];
    const expected = [{ uid, isVisible: false }];
    expect(notificationsReducer(testState, hideNotification(uid))).toEqual(expected);
  });

  it('should handle hideAllNotifications properly', () => {
    const testState = [{ uid: 1, isVisible: true }, { uid: 2, isVisible: true }];
    const expectedState = [{ uid: 1, isVisible: false }, { uid: 2, isVisible: false }];
    expect(notificationsReducer(testState, hideAllNotifications())).toEqual(expectedState);
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
  describe('showNotification', () => {
    it('should return correct type and passed options object', () => {
      const options = {};
      const expected = { type: SHOW_NOTIFICATION, options };
      expect(showNotification(options)).toEqual(expected);
    });
  });

  describe('hideNotification', () => {
    it('should return correct type and passed uid', () => {
      const expected = { type: HIDE_NOTIFICATION, uid };
      expect(hideNotification(uid)).toEqual(expected);
    });
  });

  describe('hideAllNotifications', () => {
    it('should return correct type', () => {
      const expected = { type: HIDE_ALL_NOTIFICATIONS };
      expect(hideAllNotifications()).toEqual(expected);
    });
  });

  describe('removeNotification', () => {
    it('should return correct type and passed uid', () => {
      const expected = { type: REMOVE_NOTIFICATION, uid };
      expect(removeNotification(uid)).toEqual(expected);
    });
  });
});
