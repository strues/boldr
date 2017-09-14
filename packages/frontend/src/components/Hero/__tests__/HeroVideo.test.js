import React from 'react';
import { shallow } from 'enzyme';

import { HeroVideo } from '../HeroVideo';

describe('HeroVideo', () => {
  it('should render a div with .boldr-hero__video', () => {
    const container = shallow(<HeroVideo>My HeroVideo</HeroVideo>);
    expect(container.contains(<div className="boldr-hero__video">My HeroVideo</div>)).toBe(true);
  });

  it('should render a p with .boldr-hero__video', () => {
    const container = shallow(<HeroVideo tag="p">My HeroVideo</HeroVideo>);
    expect(container.contains(<p className="boldr-hero__video">My HeroVideo</p>)).toBe(true);
  });

  it('should render a div with .boldr-hero__video with modifiers', () => {
    const container = shallow(<HeroVideo isTransparent />);
    expect(container.hasClass('boldr-hero__video')).toBe(true);
    expect(container.hasClass('is-transparent')).toBe(true);
  });

  it('should render a div with .boldr-hero__video, modifiers and custom classNames', () => {
    const container = shallow(<HeroVideo isTransparent className="custom loader" />);
    expect(container.hasClass('boldr-hero__video')).toBe(true);
    expect(container.hasClass('is-transparent')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });

  it('should render a div with .boldr-hero__video and custom classNames', () => {
    const container = shallow(<HeroVideo className="custom loader" />);
    expect(container.hasClass('boldr-hero__video')).toBe(true);
    expect(container.hasClass('custom')).toBe(true);
    expect(container.hasClass('loader')).toBe(true);
  });
});
