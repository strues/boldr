import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ButtonGroup from './ButtonGroup';

it('<Button />, should render', () => {
  const wrapper = shallow(<ButtonGroup>hi</ButtonGroup>);
  const wrapperInner = wrapper.find('.boldr-btn__group');
  expect(wrapperInner.is('.boldr-btn__group')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<ButtonGroup>hi</ButtonGroup>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
