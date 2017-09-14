import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarBurger } from '../NavbarBurger';

describe('<NavbarBurger />', () => {
  it('should render a div with .boldr-navbar__burger', () => {
    const wrapper = shallow(<NavbarBurger />);
    expect(
      wrapper.contains(
        <div className="boldr-navbar__burger">
          <span />
          <span />
          <span />
        </div>,
      ),
    ).toBe(true);
  });

  it('should render a p with .navbar-burger', () => {
    const wrapper = shallow(<NavbarBurger tag="p" />);
    expect(
      wrapper.contains(
        <p className="boldr-navbar__burger">
          <span />
          <span />
          <span />
        </p>,
      ),
    ).toBe(true);
  });

  it('should render a div with .navbar-burger and custom classNames', () => {
    const wrapper = shallow(<NavbarBurger className="custom" />);
    expect(wrapper.hasClass('boldr-navbar__burger')).toBe(true);
    expect(wrapper.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarBurger />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
