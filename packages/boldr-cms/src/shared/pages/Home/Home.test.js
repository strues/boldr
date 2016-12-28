
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Home } from './Home';

describe('<Home />', () => {
  const store = createStore(() => ({}));
  it('renders <Home /> container', () => {
    const wrapper = shallow(<Provider store={ store }><Home /></Provider>);
    expect(wrapper.find('div').length).toBe(0);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(<Provider store={ store }><Home /></Provider>)).toMatchSnapshot();
  });
});
