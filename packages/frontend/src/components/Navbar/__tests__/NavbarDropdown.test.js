import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarDropdown } from '../NavbarDropdown';

describe('<NavbarDropdown />', () => {
  it('should render a div with .boldr-navbar__dropdown', () => {
    const wrapper = shallow(<NavbarDropdown>My NavbarDropdown</NavbarDropdown>);
    expect(wrapper.contains(<div className="boldr-navbar__dropdown">My NavbarDropdown</div>)).toBe(
      true,
    );
  });

  it('should render a p with .boldr-navbar__dropdown', () => {
    const wrapper = shallow(<NavbarDropdown tag="p">My NavbarDropdown</NavbarDropdown>);
    expect(wrapper.contains(<p className="boldr-navbar__dropdown">My NavbarDropdown</p>)).toBe(
      true,
    );
  });

  it('should render a div with .boldr-navbar__dropdown and modifiers', () => {
    const wrapper = shallow(
      <NavbarDropdown isBoxed>
        <span>Any Content</span>
      </NavbarDropdown>,
    );
    expect(wrapper.hasClass('boldr-navbar__dropdown')).toBe(true);
    expect(wrapper.hasClass('is-boxed')).toBe(true);
  });

  it('should render a div with .boldr-navbar__dropdown, modifiers and custom classNames', () => {
    const wrapper = shallow(
      <NavbarDropdown isBoxed className="custom">
        <span>Any Content</span>
      </NavbarDropdown>,
    );
    expect(wrapper.hasClass('boldr-navbar__dropdown')).toBe(true);
    expect(wrapper.hasClass('is-boxed')).toBe(true);
    expect(wrapper.hasClass('custom')).toBe(true);
  });

  it('should render a div with .boldr-navbar__dropdown and custom classNames', () => {
    const wrapper = shallow(
      <NavbarDropdown className="custom">
        <span>Any Content</span>
      </NavbarDropdown>,
    );
    expect(wrapper.hasClass('boldr-navbar__dropdown')).toBe(true);
    expect(wrapper.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarDropdown>My NavbarDropdown</NavbarDropdown>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
