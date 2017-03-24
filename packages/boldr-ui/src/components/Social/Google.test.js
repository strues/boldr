import React from 'react';
import { shallow, mount } from 'enzyme';
import Google from './Google';

test('<Google />', () => {
  const wrapper = shallow(<Google href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
