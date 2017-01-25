import React from 'react';
import { shallow } from 'enzyme';

import Notifications from '../Notification';
import App from './App';

describe('<App />', () => {
  it('should render the notification', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Notifications).length).toBe(1);
  });

  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <App>
        {children}
      </App>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
