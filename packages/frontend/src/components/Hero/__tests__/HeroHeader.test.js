import React from 'react';
import { shallow } from 'enzyme';

import { HeroHeader } from '../HeroHeader';

describe('HeroHeader', () => {
  it('should render a header with .boldr-hero__head', () => {
    const component = shallow(<HeroHeader>Any Content</HeroHeader>);
    expect(component.contains(<header className="boldr-hero__head">Any Content</header>)).toBe(
      true,
    );
  });

  it('should render a div with .boldr-hero__head', () => {
    const component = shallow(<HeroHeader tag="div">Any Content</HeroHeader>);
    expect(component.contains(<div className="boldr-hero__head">Any Content</div>)).toBe(true);
  });

  it('should render a header with .boldr-hero__head and custom classNames', () => {
    const component = shallow(<HeroHeader className="custom loader" />);
    expect(component.hasClass('boldr-hero__head')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
    expect(component.hasClass('loader')).toBe(true);
  });
});
