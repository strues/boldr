import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';

it('<Hero />, renders the hero', () => {
  const wrapper = shallow(<Hero />);
  expect(wrapper.find('.boldr-hero').length).toBe(1);
});
