import React from 'react';
import { shallow } from 'enzyme';
import Signup from './Signup';

it('<Signup />, renders the signup form card', () => {
  const handleOnSubmit = jest.fn();

  const wrapper = shallow(<Signup onSubmit={handleOnSubmit} />);
  expect(wrapper.find('.boldr-form__signup').length).toBe(1);
});
