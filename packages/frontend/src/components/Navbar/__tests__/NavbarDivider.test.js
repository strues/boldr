import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarDivider } from '../NavbarDivider';

describe('NavbarDivider', () => {
  it('should render a hr with .boldr-navbar__divider', () => {
    const wrapper = shallow(<NavbarDivider />);
    expect(wrapper.contains(<hr className="boldr-navbar__divider" />)).toBe(true);
  });

  it('should render a p with .boldr-navbar__divider', () => {
    const wrapper = shallow(<NavbarDivider tag="p" />);
    expect(wrapper.contains(<p className="boldr-navbar__divider" />)).toBe(true);
  });

  it('should render a hr with .boldr-navbar__divider and custom classNames', () => {
    const wrapper = shallow(<NavbarDivider className="custom" />);
    expect(wrapper.hasClass('boldr-navbar__divider')).toBe(true);
    expect(wrapper.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarDivider />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
