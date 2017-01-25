import React from 'react';
import { shallow, mount } from 'enzyme';
import Heading from './Heading';

it('<Heading />, renders the heading component with props', () => {
  const wrapper = mount(<Heading size={ 1 } />);
  expect(wrapper.props().size).toBe(1);
});
