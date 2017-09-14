import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Container } from './Container';

describe('Container', () => {
  // it('should render a div with .boldr-container', () => {
  //   const container = shallow(<Container>My Container</Container>);
  //   expect(container.contains(<div className="boldr-container">My Container</div>)).toBe(true);
  // });
  //
  // it('should render a p with .boldr-container', () => {
  //   const container = shallow(<Container tag="p">My Container</Container>);
  //   expect(container.contains(<p className="boldr-container">My Container</p>)).toBe(true);
  // });

  it('should render a div with .boldr-container with modifiers', () => {
    const container = shallow(<Container isFluid />);
    expect(container.hasClass('boldr-container')).toBe(true);
    expect(container.hasClass('is-fluid')).toBe(true);
  });

  it('should render a div with .boldr-container, modifiers and custom classNames', () => {
    const container = shallow(<Container isFluid className="custom loader" />);
    expect(container.hasClass('boldr-container')).toBe(true);
    expect(container.hasClass('is-fluid')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });

  it('should render a div with .boldr-container and custom classNames', () => {
    const container = shallow(<Container className="custom loader" />);
    expect(container.hasClass('boldr-container')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<Container>My Container</Container>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
