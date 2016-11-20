import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Button from './Button';

it('<Button />, should render', () => {
  const wrapper = shallow(<Button />);
  const wrapperInner = wrapper.find('.boldr-btn');
  expect(wrapperInner.is('.boldr-btn')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<Button />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
