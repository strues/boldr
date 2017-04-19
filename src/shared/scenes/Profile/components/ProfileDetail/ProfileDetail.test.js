import React from 'react';
import { shallow } from 'enzyme';
import ProfileDetail from './ProfileDetail';

it('<ProfileDetail />, renders the details', () => {
  const wrapper = shallow(<ProfileDetail />);
  expect(wrapper.find('li').length).toBe(1);
});
