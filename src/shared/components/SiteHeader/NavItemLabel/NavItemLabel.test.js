import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NavItemLabel from './NavItemLabel';

describe('<NavItemLabel />', () => {
  it('should render with the base element', () => {
    const wrapper = shallow(<NavItemLabel />);
    expect(wrapper.find('.boldrui-sh__navitem-text').length).toBe(1);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavItemLabel name="abc" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
