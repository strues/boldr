import React from 'react';
import { shallow, mount } from 'enzyme';
import Social from './Social';

test('<Social />', () => {
  const wrapper = shallow(<Social facebook twitter google github linkedin />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
