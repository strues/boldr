import React from 'react';
import { shallow } from 'enzyme';
import ProfileForm from './ProfileForm';

it('<ProfileForm />, renders the form', () => {
  const handleOnSubmit = jest.fn();

  const wrapper = shallow(<ProfileForm onSubmit={handleOnSubmit} />);
  expect(wrapper.is('.boldr-form__profile')).toEqual(false);
});
