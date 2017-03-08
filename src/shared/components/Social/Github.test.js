import React from 'react';
import { shallow, mount } from 'enzyme';
import Github from './Github';

test('<Github />', () => {
  const wrapper = shallow(<Github href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
