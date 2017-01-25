import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Blockquote from './Blockquote';

describe('<Blockquote />', () => {
  const wrapper = shallow(<Blockquote />);
  it('renders <Blockquote /> without breaking', () => {
    expect(wrapper.find('svg').length).toBe(1);
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
