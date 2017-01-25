import React from 'react';
import { shallow } from 'enzyme';

import AppRoot from './AppRoot';
import configureStore from '../../state/store';

describe('<AppRoot />', () => {
  it('uses redux Provider', () => {
    const store = configureStore({});
    const messages = {};

    const renderedComponent = shallow(
      <AppRoot store={store} messages={messages}>
        <div>a child</div>
      </AppRoot>
    );

    expect(renderedComponent.find('Provider').length).toEqual(1);
  });
});
