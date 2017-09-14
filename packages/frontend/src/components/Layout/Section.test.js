import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Section } from './Section';

describe('Section', () => {
  it('should render a section with .section', () => {
    const container = shallow(<Section>My Section</Section>);
    expect(container.contains(<section className="boldr-section">My Section</section>)).toBe(true);
  });

  it('should render a div with .section', () => {
    const container = shallow(<Section tag="div">My Section</Section>);
    expect(container.contains(<div className="boldr-section">My Section</div>)).toBe(true);
  });

  it('should render a section with .boldr-section and modifiers', () => {
    const containerLarge = shallow(<Section isSize="large" />);
    expect(containerLarge.hasClass('boldr-section')).toBe(true);
    expect(containerLarge.hasClass('is-large')).toBe(true);

    const containerMedium = shallow(<Section isSize="medium" />);
    expect(containerMedium.hasClass('boldr-section')).toBe(true);
    expect(containerMedium.hasClass('is-medium')).toBe(true);

    const containerFail = shallow(<Section isSize="fail" />);
    expect(containerFail.hasClass('boldr-section')).toBe(true);
    expect(containerFail.hasClass('is-fail')).toBe(false);
  });

  it('should render a section with .boldr-section, modifiers and custom classNames', () => {
    const container = shallow(<Section isSize="medium" className="custom loader" />);
    expect(container.hasClass('boldr-section')).toBe(true);
    expect(container.hasClass('is-medium')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });

  it('should render a section with .boldr-section with custom classNames', () => {
    const container = shallow(<Section className="custom" />);
    expect(container.hasClass('custom')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<Section>My Section</Section>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
