import React from 'react';
import { shallow } from 'enzyme';
import SidebarTags from './SidebarTags';

it('<SidebarTags />, renders the tags', () => {
  const wrapper = shallow(<SidebarTags />);
  expect(wrapper.find('div').length).toBe(1);
});
