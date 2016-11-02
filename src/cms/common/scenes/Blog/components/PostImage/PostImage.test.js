/* eslint-env mocha */
import React from 'react';
import { mount } from 'enzyme';
import PostImage from './PostImage';

it('<PostImage />, renders the post image without blowing up', () => {
  const wrapper = mount(<PostImage />);
  const innerWrapper = wrapper.find('.postimage');
  expect(innerWrapper.is('.postimage')).toBe(true);
});
