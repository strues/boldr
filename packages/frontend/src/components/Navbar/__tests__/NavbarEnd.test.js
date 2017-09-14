import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { NavbarEnd } from '../NavbarEnd';

describe('<NavbarEnd />', () => {
  it('should render a div with .boldr-navbar__end', () => {
    const component = shallow(<NavbarEnd />);
    expect(component.contains(<div className="boldr-navbar__end" />)).toBe(true);
  });

  it('should render a p with .boldr-navbar__end', () => {
    const component = shallow(<NavbarEnd tag="p" />);
    expect(component.contains(<p className="boldr-navbar__end" />)).toBe(true);
  });

  it('should render a div with boldr-navbar__end and custom classNames', () => {
    const component = shallow(<NavbarEnd className="custom" />);
    expect(component.hasClass('boldr-navbar__end')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<NavbarEnd />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
