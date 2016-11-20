import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CardContent from './CardContent';

it('<CardContent />, should render', () => {
  const wrapper = shallow(<CardContent>Hey</CardContent>);
  const wrapperInner = wrapper.find('.boldr-card__content');
  expect(wrapperInner.is('.boldr-card__content')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<CardContent>Hey</CardContent>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
