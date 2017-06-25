import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Icon from './Icon';

it('renders snapshot', () => {
  const wrapper = shallow(<Icon kind="menu" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
