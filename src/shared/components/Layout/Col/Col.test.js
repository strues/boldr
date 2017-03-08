import React from 'react';
import { shallow, mount } from 'enzyme';
import Col from './Col';

it('<Col />, should have a class reflective of size props', () => {
  const wrapper = mount(<Col xs={ 12 } />);
  const wrapperClass = wrapper.find('.grid__col--xs-12');
  expect(wrapperClass.is('.grid__col--xs-12')).toBe(true);
});
