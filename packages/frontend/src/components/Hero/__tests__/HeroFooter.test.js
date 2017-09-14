import React from 'react';
import { shallow } from 'enzyme';

import { HeroFooter } from '../HeroFooter';

describe('HeroFooter', () => {
  it('should render a footer with .boldr-hero__footer', () => {
    const component = shallow(<HeroFooter>Any Content</HeroFooter>);
    expect(component.contains(<footer className="boldr-hero__footer">Any Content</footer>)).toBe(
      true,
    );
  });

  it('should render a div with .boldr-hero__footer', () => {
    const component = shallow(<HeroFooter tag="div">Any Content</HeroFooter>);
    expect(component.contains(<div className="boldr-hero__footer">Any Content</div>)).toBe(true);
  });

  it('should render a footer with .boldr-hero__footer', () => {
    const component = shallow(<HeroFooter>Any Content</HeroFooter>);
    expect(component.contains(<footer className="boldr-hero__footer">Any Content</footer>)).toBe(
      true,
    );
  });

  it('should render a footer with .boldr-hero__footer and custom classNames', () => {
    const component = shallow(<HeroFooter className="custom loader" />);
    expect(component.hasClass('boldr-hero__footer')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
    expect(component.hasClass('loader')).toBe(true);
  });
});
