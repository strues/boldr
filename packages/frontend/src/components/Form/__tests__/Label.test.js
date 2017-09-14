import React from 'react';
import { shallow } from 'enzyme';

import { Label } from '../Label';

describe('Label', () => {
  it('should render a label with .boldr-form__label', () => {
    const component = shallow(<Label>My Label</Label>);
    expect(component.contains(<label className="boldr-form__label">My Label</label>)).toBe(true);
  });

  it('should render a label with .boldr-form__label and modifiers', () => {
    const component = shallow(<Label isSize="small" />);
    expect(component.hasClass('boldr-form__label')).toBe(true);
    expect(component.hasClass('is-small')).toBe(true);
  });

  it('should render a label with .boldr-form__label, modifiers and custom classNames', () => {
    const component = shallow(<Label isSize="large" className="custom" />);
    expect(component.hasClass('boldr-form__label')).toBe(true);
    expect(component.hasClass('is-large')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a label with .boldr-form__label and custom classNames', () => {
    const component = shallow(<Label className="custom" />);
    expect(component.hasClass('boldr-form__label')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
