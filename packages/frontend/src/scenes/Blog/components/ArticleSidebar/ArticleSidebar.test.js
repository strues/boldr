/* eslint-env mocha */
import React from 'react';
import { shallow } from 'enzyme';
import ArticleSidebar from './ArticleSidebar';

it('<ArticleSidebar />, renders the post image without blowing up', () => {
  const wrapper = shallow(<ArticleSidebar />);

  expect(wrapper.find('aside').length).toBe(1);
});
