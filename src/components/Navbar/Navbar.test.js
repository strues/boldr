import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Navbar } from './Navbar';

describe('<Navbar />', () => {
  it('should render as .boldrui-navbar', () => {
    const wrapper = shallow(<Navbar>Test</Navbar>);
    expect(wrapper.contains(<nav className="boldrui-navbar">Test</nav>)).toBe(true);
  });

  it('should render a div with .boldrui-navbar', () => {
    const wrapper = shallow(<Navbar tag="div">Test</Navbar>);
    expect(wrapper.contains(<div className="boldrui-navbar">Test</div>)).toBe(true);
  });

  it('should render a nav with .navbar and modifiers', () => {
    const wrapper = shallow(
      <Navbar isTransparent>
        <span>Test</span>
      </Navbar>,
    );
    expect(wrapper.hasClass('boldrui-navbar')).toBe(true);
    expect(wrapper.hasClass('is-transparent')).toBe(true);
  });

  it('should render a nav with .navbar, modifiers and custom classNames', () => {
    const wrapper = shallow(
      <Navbar isTransparent className="custom">
        <span>Test</span>
      </Navbar>,
    );
    expect(wrapper.hasClass('boldrui-navbar')).toBe(true);
    expect(wrapper.hasClass('is-transparent')).toBe(true);
    expect(wrapper.hasClass('custom')).toBe(true);
  });

  it('should render a nav with .navbar and custom classNames', () => {
    const wrapper = shallow(
      <Navbar className="custom">
        <span>Test</span>
      </Navbar>,
    );
    expect(wrapper.hasClass('boldrui-navbar')).toBe(true);
    expect(wrapper.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<Navbar>Test</Navbar>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
