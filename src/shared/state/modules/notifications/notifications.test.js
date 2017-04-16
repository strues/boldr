import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import notificationReducer, {
  notificationDismiss,
  NOTIFICATION_DISMISS,
  NOTIFICATION_CLEAR,
} from './notifications';

describe('Notifications Reducer', () => {
  it('Should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual([]);
  });
  it('should clear the notifications', () => {
    const initialState = [{id: 1}, {id: 2}];
    const stateAfter = [];
    expect(
      notificationReducer(initialState, {
        type: NOTIFICATION_CLEAR,
      }),
    ).toEqual(stateAfter);
  });
  it('Should remove the selected notification', () => {
    const initialState = [{id: 1}, {id: 2}];
    const stateAfter = [{id: 2}];
    expect(
      notificationReducer(initialState, {
        type: NOTIFICATION_DISMISS,
        payload: 1,
      }),
    ).toEqual(stateAfter);
  });
});

test('Dismiss Action', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    notifications: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
  });
  store.dispatch(notificationDismiss(1));
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: 'NOTIFICATION_DISMISS',
    payload: 1,
  });
});
