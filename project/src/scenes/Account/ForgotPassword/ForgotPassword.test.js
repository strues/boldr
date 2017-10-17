import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ForgotPassword from './ForgotPassword';

test('<ForgotPassword />, renders the forgot password form card', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const initialState = {};
  const store = mockStore(initialState);
  const wrapper = shallow(
    <Provider store={store}>
      <ForgotPassword />
    </Provider>,
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
