import React from 'react';
import { shallow } from 'enzyme';

import { Hero } from '../Hero';

describe('Hero', () => {
  it('should render a section with .boldr-hero', () => {
    const container = shallow(<Hero>My Hero</Hero>);
    expect(container.contains(<section className="boldr-hero">My Hero</section>)).toBe(true);
  });

  it('should render a div with .boldr-hero', () => {
    const container = shallow(<Hero tag="div">My Hero</Hero>);
    expect(container.contains(<div className="boldr-hero">My Hero</div>)).toBe(true);
  });

  it('should render a section with .boldr-hero with modifiers', () => {
    const container = shallow(<Hero isBold isFullHeight />);
    expect(container.hasClass('boldr-hero')).toBe(true);
    expect(container.hasClass('is-bold')).toBe(true);
    expect(container.hasClass('is-fullheight')).toBe(true);
  });

  it('should render a section with .boldr-hero and color modifiers', () => {
    const container = shallow(<Hero isBold isFullHeight isColor="light" />);
    expect(container.hasClass('boldr-hero')).toBe(true);
    expect(container.hasClass('is-bold')).toBe(true);
    expect(container.hasClass('is-fullheight')).toBe(true);
    expect(container.hasClass('is-light')).toBe(true);
  });

  it('should render a section with .boldr-hero and size modifiers', () => {
    const container = shallow(<Hero isBold isFullHeight isSize="medium" />);
    expect(container.hasClass('boldr-hero')).toBe(true);
    expect(container.hasClass('is-bold')).toBe(true);
    expect(container.hasClass('is-fullheight')).toBe(true);
    expect(container.hasClass('is-medium')).toBe(true);
  });

  it('should render a section with .boldr-hero, modifiers and custom classNames', () => {
    const container = shallow(<Hero isBold className="custom loader" />);
    expect(container.hasClass('boldr-hero')).toBe(true);
    expect(container.hasClass('is-bold')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });

  it('should render a section with .boldr-hero and custom classNames', () => {
    const container = shallow(<Hero className="custom loader" />);
    expect(container.hasClass('boldr-hero')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });
});
