import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import AppRoot from './AppRoot';


describe('<AppRoot />', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  it('uses redux Provider', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const messages = {};

    const renderedComponent = shallow(
      <AppRoot store={ store } messages={ messages }>
        <div>a child</div>
      </AppRoot>
    );

    expect(renderedComponent.find('Provider').length).toEqual(1);
  });
});
