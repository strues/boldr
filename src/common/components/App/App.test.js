import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

describe('<App />', () => {
  function setup() {
    const store = createStore(() => ({}));
    const wrapper = shallow(<Provider store={ store }><App><children /></App></Provider>);
    const instance = wrapper.instance();

    return { wrapper, instance };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).toBe.ok;
    expect(instance).toBe.ok;
  });

  it('renders its children', () => {
    const { wrapper } = setup();
    const children = wrapper.find('children');

    expect(children.length).toBe(1);
  });
});
