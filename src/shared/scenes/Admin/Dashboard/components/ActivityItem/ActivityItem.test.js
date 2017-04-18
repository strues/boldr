import React from 'react';
import {shallow} from 'enzyme';
import act from '../../__fixtures__/activity.fixture';
import ActivityItem from './ActivityItem';

test('<ActivityItemDetail />, renders the widget with props', () => {
  const wrapper = shallow(<ActivityItem {...act} />);
  expect(wrapper.instance().props).toEqual(act);
});
