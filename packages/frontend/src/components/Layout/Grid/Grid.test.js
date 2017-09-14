import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Grid from './Grid';

describe('<Grid>', () => {
  it('should render "contained"', () => {
    const wrapper = mount(<Grid />);
    const wrapperInner = wrapper.find('.grid');
    expect(wrapperInner.is('.grid')).toBe(true);
  });
  it('should render with fluid props', () => {
    const wrapper = mount(<Grid fluid />);
    const wrapperInner = wrapper.find('.grid--fluid');
    expect(wrapperInner.is('.grid--fluid')).toBe(true);
  });
  it('should render with the passed html tag', () => {
    const wrapper = mount(<Grid componentClass="section" />);
    const wrapperInner = wrapper.find('section');
    expect(wrapperInner.is('.grid')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<Grid />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
