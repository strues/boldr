import React from 'react';
import { shallow } from 'enzyme';
import StatsWidget from '../StatsWidget';

const stats = {
  posts: 1,
  users: 1,
  tags: 1,
};

it('<StatsWidget />, renders the widget with props', () => {
  const wrapper = shallow(<StatsWidget stats={stats} />);
  expect(wrapper.instance().props.stats).toEqual(stats);
});
