import React from 'react';
import shallow from 'react-test-renderer/shallow';
import sinon from 'sinon';
import {shallowToJson} from 'enzyme-to-json';
import Notification from './Notification';
import {fakeNotif} from './__fixtures__/notifications.fixture';

describe('<Notification />', () => {
  it('+++ should render okay with props', () => {
    const wrapper = shallow(<Notification {...fakeNotif} />);

    expect(wrapper).toBe.ok;
  });
  it('+++ should render with a button', () => {
    const _onActionClick = sinon.spy();
    const wrapper = shallow(
      <Notification
        {...fakeNotif}
        actionLabel="Close"
        onActionClick={_onActionClick}
      />,
    );

    wrapper.find('button').simulate('click');
    expect(_onActionClick.calledOnce).toEqual(true);
  });
  it('+++ renders snapshot', () => {
    const wrapper = shallow(<Notification {...fakeNotif} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
