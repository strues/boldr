import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ResetPassword from './ResetPassword';

test('<ResetPassword />, renders the reset password form card', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const initialState = {};
  const store = mockStore(initialState);
  const wrapper = shallow(
    <Provider store={store}>
      <ResetPassword />
    </Provider>,
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
