import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Container } from './Container';

describe('Container', () => {
  // it('should render a div with .boldrui-container', () => {
  //   const container = shallow(<Container>My Container</Container>);
  //   expect(container.contains(<div className="boldrui-container">My Container</div>)).toBe(true);
  // });
  //
  // it('should render a p with .boldrui-container', () => {
  //   const container = shallow(<Container tag="p">My Container</Container>);
  //   expect(container.contains(<p className="boldrui-container">My Container</p>)).toBe(true);
  // });

  it('should render a div with .boldrui-container with modifiers', () => {
    const container = shallow(<Container isFluid />);
    expect(container.hasClass('boldrui-container')).toBe(true);
    expect(container.hasClass('is-fluid')).toBe(true);
  });

  it('should render a div with .boldrui-container, modifiers and custom classNames', () => {
    const container = shallow(<Container isFluid className="custom loader" />);
    expect(container.hasClass('boldrui-container')).toBe(true);
    expect(container.hasClass('is-fluid')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });

  it('should render a div with .boldrui-container and custom classNames', () => {
    const container = shallow(<Container className="custom loader" />);
    expect(container.hasClass('boldrui-container')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<Container>My Container</Container>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
