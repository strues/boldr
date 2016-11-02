import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import About from './About';

describe('<About />', () => {
  const wrapper = shallow(<About />);
  it('renders <About /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
