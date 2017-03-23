import React from 'react';
import { shallow, mount } from 'enzyme';
import Grid from './Grid';

it('<Grid />, should have a class name', () => {
  const wrapper = mount(<Grid />);
  const wrapperInner = wrapper.find('.grid');
  expect(wrapperInner.is('.grid')).toBe(true);
});

it('<Grid />, should accept a fluid property', () => {
  const wrapper = mount(<Grid fluid />);
  const wrapperInner = wrapper.find('.grid--fluid');
  expect(wrapperInner.is('.grid--fluid')).toBe(true);
});
