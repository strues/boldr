import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarMenu } from '../NavbarMenu';

describe('<NavbarMenu />', () => {
  it('should render a div with .boldr-navbar__menu', () => {
    const component = shallow(<NavbarMenu>My Nav</NavbarMenu>);
    expect(component.contains(<div className="boldr-navbar__menu">My Nav</div>)).toBe(true);
  });

  it('should render a div with .boldr-navbar__menu', () => {
    const component = shallow(<NavbarMenu tag="nav">My Nav</NavbarMenu>);
    expect(component.contains(<nav className="boldr-navbar__menu">My Nav</nav>)).toBe(true);
  });

  it('should render a div with .boldr-navbar__menu and modifiers', () => {
    const component = shallow(
      <NavbarMenu isActive>
        <span>Any Content</span>
      </NavbarMenu>,
    );
    expect(component.hasClass('boldr-navbar__menu')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
  });

  it('should render a div with .boldr-navbar__menu, modifiers and custom classNames', () => {
    const component = shallow(
      <NavbarMenu isActive className="custom">
        <span>Any Content</span>
      </NavbarMenu>,
    );
    expect(component.hasClass('boldr-navbar__menu')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a div with .boldr-navbar__menu and custom classNames', () => {
    const component = shallow(
      <NavbarMenu className="custom">
        <span>Any Content</span>
      </NavbarMenu>,
    );
    expect(component.hasClass('boldr-navbar__menu')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarMenu>My Nav</NavbarMenu>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
