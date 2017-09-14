import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarBrand } from '../NavbarBrand';

describe('<NavbarBrand />', () => {
  it('should render a div with .boldr-navbar__brand', () => {
    const wrapper = shallow(<NavbarBrand>Test</NavbarBrand>);
    expect(wrapper.contains(<div className="boldr-navbar__brand">Test</div>)).toBe(true);
  });

  it('should render a p with .navbar-brand', () => {
    const wrapper = shallow(<NavbarBrand tag="p">Test</NavbarBrand>);
    expect(wrapper.contains(<p className="boldr-navbar__brand">Test</p>)).toBe(true);
  });

  it('should render a div with .navbar-brand and custom classNames', () => {
    const wrapper = shallow(
      <NavbarBrand className="custom">
        <span>Test</span>
      </NavbarBrand>,
    );
    expect(wrapper.hasClass('boldr-navbar__brand')).toBe(true);
    expect(wrapper.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarBrand>Test</NavbarBrand>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
