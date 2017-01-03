import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Bold from './Bold';

describe('<Bold />', () => {
  const wrapper = shallow(<Bold />);
  it('renders <Bold /> without breaking', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
