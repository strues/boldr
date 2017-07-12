import React from 'react';
import { shallow, mount } from 'enzyme';
import Notification from './Notification';

const testProps = {
  isVisible: true,
  notificationHeight: 40,
  animatedMargin: 'top',
  animationDuration: 400,
  animationEasing: 'ease',
};
const children = <p>test</p>;
const renderComponent = (props = {}) =>
  shallow(
    <Notification {...props}>
      {children}
    </Notification>,
  );

const mountComponent = (props = {}) =>
  mount(
    <Notification {...props}>
      {children}
    </Notification>,
  );

describe('<Notification />', () => {
  it('should render <div> tag', () => {
    const renderedComponent = renderComponent(testProps);
    expect(renderedComponent.type()).toEqual('div');
  });

  it('should have children', () => {
    const renderedComponent = renderComponent(testProps);
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should accept certain props', () => {
    const mountedComponent = mountComponent(testProps);
    expect(mountedComponent.props()).toMatchObject(testProps);
  });
});
