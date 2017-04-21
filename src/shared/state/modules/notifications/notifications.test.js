import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import notificationReducer, {
  dismissNotification,
  SEND_NOTIFICATION,
  DISMISS_NOTIFICATION,
  CLEAR_NOTIFICATION,
} from './notifications';

describe('Notifications Reducer', () => {
  it('Should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual([]);
  });
  it('should clear the notifications', () => {
    const initialState = [{ id: 1 }, { id: 2 }];
    const stateAfter = [];
    expect(
      notificationReducer(initialState, {
        type: CLEAR_NOTIFICATION,
      }),
    ).toEqual(stateAfter);
  });
  it('Should remove the selected notification', () => {
    const initialState = [{ id: 1 }, { id: 2 }];
    const stateAfter = [{ id: 2 }];
    const id = 1;
    expect(
      notificationReducer(initialState, {
        type: DISMISS_NOTIFICATION,
        id,
      }),
    ).toEqual(stateAfter);
  });
});

test('Dismiss Action', () => {
  const id = 1;
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
  store.dispatch(dismissNotification(1));
  const action = store.getActions()[0];
  expect(action).toEqual({
    type: DISMISS_NOTIFICATION,
    id,
  });
});
