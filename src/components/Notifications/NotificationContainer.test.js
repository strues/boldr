import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { hideNotification, removeNotification } from '../../state/notifications/notifications';
import NotificationContainer from './NotificationContainer';

jest.useFakeTimers();

describe('<NotificationContainer />', () => {
  const mockStore = configureStore();
  let mountedComponent, store;
  const testProps = {
    uid: 1,
    dismissAfter: 1000,
    animatedMargin: 'bottom',
    animationDuration: 400,
    animationEasing: 'ease',
  };
  const testNotificationState = { uid: testProps.uid, isVisible: true };
  const testInitialState = {
    notifications: [testNotificationState],
  };

  beforeEach(() => {
    setTimeout.mockClear();
    store = mockStore(testInitialState);
    store.dispatch = jest.fn();
    mountedComponent = mount(
      <Provider store={store}>
        <NotificationContainer {...testProps} />
      </Provider>,
    );
  });

  it('maps state to props', () => {
    expect(mountedComponent.find('NotificationContainer').props()).toMatchObject(
      testNotificationState,
    );
  });

  it('maps dispatch to props', () => {
    expect(mountedComponent.find('NotificationContainer').props()).toMatchObject({
      hideNotification: expect.any(Function),
    });
  });

  it('dispatches hideNotification and removeNotification', () => {
    const { uid, dismissAfter, animationDuration } = testProps;
    jest.runAllTimers();
    expect(setTimeout.mock.calls.length).toBe(2);
    expect(setTimeout.mock.calls[0][1]).toBe(dismissAfter);
    expect(setTimeout.mock.calls[1][1]).toBe(dismissAfter + animationDuration);
    expect(store.dispatch).toHaveBeenCalledWith(hideNotification(uid));
    expect(store.dispatch).toHaveBeenCalledWith(removeNotification(uid));
  });
});
