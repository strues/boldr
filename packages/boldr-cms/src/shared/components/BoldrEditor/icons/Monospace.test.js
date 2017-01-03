import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Monospace from './Monospace';

describe('<Monospace />', () => {
  const wrapper = shallow(<Monospace />);
  it('renders <Monospace /> without breaking', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
