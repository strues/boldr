/* eslint-env mocha */
import React from 'react';
import {mount} from 'enzyme';
import PostImage from './PostImage';

it('<PostImage />, renders the post image without blowing up', () => {
  const wrapper = mount(<PostImage />);
  const innerWrapper = wrapper.find('.boldr-post__image-wrap');
  expect(innerWrapper.is('.boldr-post__image-wrap')).toBe(true);
});
