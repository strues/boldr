import React from 'react';
import { shallow } from 'enzyme';

import { Label } from '../Label';

describe('Label', () => {
  it('should render a label with .boldrui-form__label', () => {
    const component = shallow(<Label>My Label</Label>);
    expect(component.contains(<label className="boldrui-form__label">My Label</label>)).toBe(true);
  });

  it('should render a label with .boldrui-form__label and modifiers', () => {
    const component = shallow(<Label isSize="small" />);
    expect(component.hasClass('boldrui-form__label')).toBe(true);
    expect(component.hasClass('is-small')).toBe(true);
  });

  it('should render a label with .boldrui-form__label, modifiers and custom classNames', () => {
    const component = shallow(<Label isSize="large" className="custom" />);
    expect(component.hasClass('boldrui-form__label')).toBe(true);
    expect(component.hasClass('is-large')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a label with .boldrui-form__label and custom classNames', () => {
    const component = shallow(<Label className="custom" />);
    expect(component.hasClass('boldrui-form__label')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
