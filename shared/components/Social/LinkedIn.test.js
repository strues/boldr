import React from 'react';
import { shallow, mount } from 'enzyme';
import LinkedIn from './LinkedIn';

test('<LinkedIn />', () => {
  const wrapper = shallow(<LinkedIn href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
