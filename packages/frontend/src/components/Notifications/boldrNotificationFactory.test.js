import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import boldrNotificationsFactory, { defaultProps } from './boldrNotificationsFactory';
import Container from './Container';
import { NotificationContainer } from './NotificationContainer';

describe('boldrNotificationsFactory', () => {
  const testProps = {
    position: ['auto', 'auto', '20px', '20px'],
    stackNextOn: 'top',
    animationDuration: 1000,
    animationEasing: 'ease',
    dismissAfter: 100,
  };
  const {
    position,
    stackNextOn,
    animationDuration,
    animationEasing,
    dismissAfter,
    slideFromSide,
  } = testProps;
  const numOfNotifications = 3;
  const testInitialState = {
    boldr: {
      notifications: [
        { isVisible: true, height: 40, uid: 1, options: {} },
        { isVisible: true, height: 40, uid: 2, options: {} },
        { isVisible: true, height: 40, uid: 3, options: {} },
      ],
    },
  };

  const WrappedNotification = () => <div>Notification</div>;
  const Notifications = boldrNotificationsFactory(WrappedNotification);
  const mockStore = configureStore();
  const store = mockStore(testInitialState);
  store.dispatch = jest.fn();
  const mountComponent = (props = {}) =>
    mount(
      <Provider store={store}>
        <Notifications {...props} />
      </Provider>,
    );

  it('maps state to props', () => {
    const mountedComponent = mountComponent(testProps);
    expect(mountedComponent.find('Notifications').prop('notifications')).toEqual(
      testInitialState.boldr.notifications,
    );
  });

  it('maps dispatch to props', () => {
    const mountedComponent = mountComponent(testProps);
    expect(mountedComponent.find('Notifications').prop('hideNotification')).toEqual(
      expect.any(Function),
    );
  });

  it('adopts default props if no props passed', () => {
    const mountedComponent = mountComponent();
    expect(mountedComponent.find('Notifications').props()).toMatchObject(defaultProps);
  });

  it('properly renders Container component', () => {
    const mountedComponent = mountComponent(testProps);
    expect(mountedComponent.find(Container).length).toEqual(1);
    expect(mountedComponent.find(Container).props()).toMatchObject({
      position,
      stackNextOn,
      animationDuration,
      animationEasing,
      slideFromSide,
    });
  });

  it('properly renders list of NotificationContainers', () => {
    const mountedComponent = mountComponent(testProps);
    expect(mountedComponent.find(NotificationContainer).length).toEqual(numOfNotifications);
    mountedComponent.find('NotificationContainer').forEach(component => {
      expect(component.props()).toMatchObject({
        uid: expect.anything(),
        animationDuration,
        animationEasing,
        slideFromSide,
        dismissAfter,
      });
    });
  });

  it('properly renders list of wrapped notification components', () => {
    const mountedComponent = mountComponent(testProps);
    expect(mountedComponent.find(WrappedNotification).length).toEqual(numOfNotifications);
    mountedComponent.find(WrappedNotification).forEach(component => {
      expect(component.props()).toMatchObject({
        hideNotification: expect.any(Function),
        options: expect.any(Object),
      });
    });
  });
});
