import  React from 'react';
import { shallow } from 'enzyme';

import { HeroBody } from './HeroBody';

describe('HeroBody', () => {
  it('should render a div with .boldrui-hero__body', () => {
    const component = shallow(<HeroBody>Any Content</HeroBody>);
    expect(component.contains(<div className="boldrui-hero__body">Any Content</div>)).toBe(true);
  });

  it('should render a p with .boldrui-hero__body', () => {
    const component = shallow(<HeroBody tag="p">Any Content</HeroBody>);
    expect(component.contains(<p className="boldrui-hero__body">Any Content</p>)).toBe(true);
  });

  it('should render a div with .boldrui-hero__body and custom classNames', () => {
    const component = shallow(<HeroBody className="custom loader" />);
    expect(component.hasClass('boldrui-hero__body')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
    expect(component.hasClass('loader')).toBe(true);
  });
});
