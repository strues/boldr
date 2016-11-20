import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CardImage from './CardImage';

it('<CardImage />, should render', () => {
  const wrapper = shallow(<CardImage />);
  const wrapperInner = wrapper.find('.boldr-card__image');
  expect(wrapperInner.is('.boldr-card__image')).toBe(true);
});

it('renders snapshot', () => {
  const wrapper = shallow(<CardImage />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
