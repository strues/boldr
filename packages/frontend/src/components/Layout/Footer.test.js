import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Footer } from './Footer';

describe('Footer', () => {
  it('should render a footer with .boldr-footer', () => {
    const component = shallow(<Footer>Any Content</Footer>);
    expect(component.contains(<footer className="boldr-footer">Any Content</footer>)).toBe(true);
  });

  it('should render a div with .boldr-footer', () => {
    const component = shallow(<Footer tag="div">Any Content</Footer>);
    expect(component.contains(<div className="boldr-footer">Any Content</div>)).toBe(true);
  });

  it('should render a footer with .boldr-footer and custom classNames', () => {
    const component = shallow(<Footer className="custom loader" />);
    expect(component.hasClass('boldr-footer')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
    expect(component.hasClass('loader')).toBe(true);
  });
  it('should match the snapshot', () => {
    const wrapper = shallow(<Footer>Any Content</Footer>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
