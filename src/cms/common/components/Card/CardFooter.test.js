import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CardFooter from './CardFooter';

it('<CardFooter />, should render', () => {
  const wrapper = shallow(<CardFooter>Hey</CardFooter>);
  const wrapperInner = wrapper.find('.boldr-card__footer');
  expect(wrapperInner.is('.boldr-card__footer')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<CardFooter>Hey</CardFooter>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
