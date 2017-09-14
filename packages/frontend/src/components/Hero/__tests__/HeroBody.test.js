import React from 'react';
import { shallow } from 'enzyme';

import { HeroBody } from '../HeroBody';

describe('HeroBody', () => {
  it('should render a div with .boldr-hero__body', () => {
    const component = shallow(<HeroBody>Any Content</HeroBody>);
    expect(component.contains(<div className="boldr-hero__body">Any Content</div>)).toBe(true);
  });

  it('should render a p with .boldr-hero__body', () => {
    const component = shallow(<HeroBody tag="p">Any Content</HeroBody>);
    expect(component.contains(<p className="boldr-hero__body">Any Content</p>)).toBe(true);
  });

  it('should render a div with .boldr-hero__body and custom classNames', () => {
    const component = shallow(<HeroBody className="custom loader" />);
    expect(component.hasClass('boldr-hero__body')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
    expect(component.hasClass('loader')).toBe(true);
  });
});
