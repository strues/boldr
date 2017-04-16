import React from 'react';
import {shallow} from 'enzyme';
import PostSidebar from './PostSidebar';

it('<PostSidebar />, renders the sidebar', () => {
  const wrapper = shallow(<PostSidebar />);
  expect(wrapper.find('aside').length).toBe(1);
});
