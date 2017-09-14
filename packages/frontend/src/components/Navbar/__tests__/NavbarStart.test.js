import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarStart } from '../NavbarStart';

describe('<NavbarStart />', () => {
  it('should render a div with .boldr-navbar__start', () => {
    const component = shallow(<NavbarStart />);
    expect(component.contains(<div className="boldr-navbar__start" />)).toBe(true);
  });

  it('should render a p with .boldr-navbar__start', () => {
    const component = shallow(<NavbarStart tag="p" />);
    expect(component.contains(<p className="boldr-navbar__start" />)).toBe(true);
  });

  it('should render a div with boldr-navbar__start and custom classNames', () => {
    const component = shallow(<NavbarStart className="custom" />);
    expect(component.hasClass('boldr-navbar__start')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarStart />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
