import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarItem } from '../NavbarItem';

describe('<NavbarItem />', () => {
  it('should render a custom component with NavbarItem props', () => {
    const customComponent = props => (
      <div>
        My Button <a {...props} />
      </div>
    );

    const customComponentRendered = (
      <div>
        My Button <a href="#" className="boldr-navbar__item" />
      </div>
    );

    const component = shallow(<NavbarItem href="#" render={customComponent} />);
    expect(component.contains(customComponentRendered)).toBe(true);
  });

  // it('should render an anchor with .boldr-navbar__item', () => {
  //   const component = shallow(<NavbarItem href="#">My NavbarItem</NavbarItem>);
  //   expect(
  //     component.contains(
  //       <a href="#" className="boldr-navbar__item">
  //         My NavbarItem
  //       </a>,
  //     ),
  //   ).toBe(true);
  // });

  it('should render a button with .boldr-navbar__item', () => {
    const component = shallow(<NavbarItem tag="button">My NavbarItem</NavbarItem>);
    expect(component.contains(<button className="boldr-navbar__item">My NavbarItem</button>)).toBe(
      true,
    );
  });

  it('should render a div with .boldr-navbar__item', () => {
    const component = shallow(<NavbarItem>My NavbarItem</NavbarItem>);
    expect(component.contains(<div className="boldr-navbar__item">My NavbarItem</div>)).toBe(true);
  });

  it('should render a div with .boldr-navbar__item and modifiers', () => {
    const component = shallow(<NavbarItem isActive isHoverable hasDropdown />);
    expect(component.is('div')).toBe(true);
    expect(component.hasClass('boldr-navbar__item')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
    expect(component.hasClass('is-hoverable')).toBe(true);
    expect(component.hasClass('has-dropdown')).toBe(true);
  });

  it('should render a div with .boldr-navbar__item, modifiers and custom classNames', () => {
    const component = shallow(<NavbarItem isActive className="custom" />);
    expect(component.is('div')).toBe(true);
    expect(component.hasClass('boldr-navbar__item')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a div with .boldr-navbar__item and custom classNames', () => {
    const component = shallow(<NavbarItem className="custom" />);
    expect(component.is('div')).toBe(true);
    expect(component.hasClass('boldr-navbar__item')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarItem href="#">My NavbarItem</NavbarItem>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
