import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
  test('Renders the login form card', () => {
    const handleOnSubmit = jest.fn();

    const wrapper = shallow(<Login onSubmit={handleOnSubmit} />);
    expect(wrapper.find('.login-wrapper').length).toBe(1);
  });
});
