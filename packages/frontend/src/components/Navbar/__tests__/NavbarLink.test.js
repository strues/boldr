import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarLink } from '../NavbarLink';

describe('NavbarLink', () => {
  it('should render a custom component with NavbarLink props', () => {
    const customComponent = props => (
      <div>
        My Button <a {...props} />
      </div>
    );

    const customComponentRendered = (
      <div>
        My Button <a href="#" className="boldr-navbar__link" />
      </div>
    );

    const component = shallow(<NavbarLink href="#" render={customComponent} />);
    expect(component.contains(customComponentRendered)).toBe(true);
  });

  it('should render an anchor with .boldr-navbar__link', () => {
    const component = shallow(<NavbarLink href="#">My NavbarLink</NavbarLink>);
    expect(
      component.contains(
        <a href="#" className="boldr-navbar__link">
          My NavbarLink
        </a>,
      ),
    ).toBe(true);
  });

  it('should render a button with .boldr-navbar__link', () => {
    const component = shallow(<NavbarLink tag="button">My NavbarLink</NavbarLink>);
    expect(component.contains(<button className="boldr-navbar__link">My NavbarLink</button>)).toBe(
      true,
    );
  });

  it('should render a a with .boldr-navbar__link and modifiers', () => {
    const component = shallow(<NavbarLink isActive />);
    expect(component.is('a')).toBe(true);
    expect(component.hasClass('boldr-navbar__link')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
  });

  it('should render a a with .boldr-navbar__link, modifiers and custom classNames', () => {
    const component = shallow(<NavbarLink isActive className="custom" />);
    expect(component.is('a')).toBe(true);
    expect(component.hasClass('boldr-navbar__link')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a a with .boldr-navbar__link and custom classNames', () => {
    const component = shallow(<NavbarLink className="custom" />);
    expect(component.is('a')).toBe(true);
    expect(component.hasClass('boldr-navbar__link')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarLink isActive />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
