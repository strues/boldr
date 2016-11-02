import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import HeaderWrapper from './HeaderWrapper';

describe('<HeaderWrapper />', () => {
  const store = createStore(() => ({}));
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <Provider store={ store }>
      <HeaderWrapper>
        <div className="unique" />
      </HeaderWrapper>
      </Provider>
    );
    expect(wrapper.contains(<div className="unique" />)).toBe(true);
  });
});
