import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Notifications from '../Notification';
import App from './App';


const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<App />', () => {
  const initialState = {};
  const store = mockStore(initialState);
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Provider store={ store }>
      <App>
        {children}
      </App>
    </Provider>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
