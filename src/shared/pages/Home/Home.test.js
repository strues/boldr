import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Home from './Home';

describe('<Home />', () => {
  const wrapper = shallow(<Home />);
  it('renders <Home /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
