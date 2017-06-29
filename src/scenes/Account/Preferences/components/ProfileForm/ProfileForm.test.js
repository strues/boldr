import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ProfileForm from './ProfileForm';

it('<ProfileForm />, renders the form', () => {
  const store = createStore(() => ({}));
  const handleOnSubmit = jest.fn();

  const wrapper = shallow(
    <Provider store={store}>
      <ProfileForm onSubmit={handleOnSubmit} />
    </Provider>,
  );
  expect(wrapper.is('.boldr-form__profile')).toEqual(false);
});
