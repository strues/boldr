import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import H2 from './H2';

describe('<H2 />', () => {
  const wrapper = shallow(<H2 />);
  it('renders <H2 /> without breaking', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
