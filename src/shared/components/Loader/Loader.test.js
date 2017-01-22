import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Loader from './Loader';

describe('<Loader />', () => {
  const wrapper = shallow(<Loader />);
  it('renders <Loader /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(5);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
