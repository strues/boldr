import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from './FormGroup';

test('+++ <FormGroup />, should render', () => {
  const wrapper = shallow(<FormGroup />);
  expect(wrapper).toBe.ok;
});

test('+++ <FormGroup />, should render children', () => {
  const wrapper = shallow(<FormGroup><h2>fasfa</h2></FormGroup>);
  expect(wrapper.find('h2').length).toBe(1);
});
