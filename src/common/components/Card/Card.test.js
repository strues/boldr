import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Card from './Card';

it('<Card />, should render', () => {
  const wrapper = shallow(<Card />);
  const wrapperInner = wrapper.find('.boldr-card');
  expect(wrapperInner.is('.boldr-card')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<Card />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
