import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import H3 from './H3';

describe('<H3 />', () => {
  const wrapper = shallow(<H3 />);
  it('renders <H3 /> without breaking', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
