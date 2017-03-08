import React from 'react';
import { shallow, mount } from 'enzyme';
import Twitter from './Twitter';

test('<Twitter />', () => {
  const wrapper = shallow(<Twitter href="a" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
