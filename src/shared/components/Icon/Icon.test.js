import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Icon from './Icon';

it('<Icon /> renders the icon svg component', () => {
  const wrapper = shallow(<Icon kind="menu" />);
  expect(wrapper.find('.boldr-icon').length).toBe(1);
});

it('renders snapshot', () => {
  const wrapper = shallow(<Icon kind="menu" />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
