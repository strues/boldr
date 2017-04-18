import React from 'react';
import {shallow} from 'enzyme';
import Login from './Login';

it('<Login />, renders the login form card', () => {
  const handleOnSubmit = jest.fn();

  const wrapper = shallow(<Login onSubmit={handleOnSubmit} />);
  expect(wrapper.find('.boldr-form__login').length).toBe(1);
});
