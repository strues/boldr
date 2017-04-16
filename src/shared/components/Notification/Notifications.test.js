import React from 'react';
import shallow from 'react-test-renderer/shallow';
import {shallowToJson} from 'enzyme-to-json';
import {Notifications} from './Notifications';
import fakeNotifs from './__fixtures__/notifications.fixture';

describe('<Notifications />', () => {
  it('+++ should render okay with props', () => {
    const wrapper = shallow(<Notifications notifications={fakeNotifs} />);

    expect(wrapper).toBe.ok;
  });

  it('+++ renders snapshot', () => {
    const wrapper = shallow(<Notifications notifications={fakeNotifs} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
