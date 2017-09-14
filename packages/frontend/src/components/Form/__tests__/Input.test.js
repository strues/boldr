import React from 'react';
import { shallow } from 'enzyme';

import { Input } from '../Input';

describe('Input', () => {
  it('should render an input with .boldr-form__input', () => {
    const component = shallow(<Input />);
    expect(component.contains(<input type="text" className="boldr-form__input" />)).toBe(true);
  });

  it('should render an input with .boldr-form__input and modifiers', () => {
    const component = shallow(<Input type="password" />);
    expect(component.contains(<input type="password" className="boldr-form__input" />)).toBe(true);
  });

  it('should render an input with .boldr-form__input and modifiers', () => {
    const component = shallow(<Input isActive isHovered isFocused />);
    expect(component.hasClass('boldr-form__input')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
    expect(component.hasClass('is-hovered')).toBe(true);
    expect(component.hasClass('is-focused')).toBe(true);
  });

  it('should render an input with .boldr-form__input, modifiers and custom classNames', () => {
    const component = shallow(<Input isActive className="custom" />);
    expect(component.hasClass('boldr-form__input')).toBe(true);
    expect(component.hasClass('is-active')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render an input with .boldr-form__input and custom classNames', () => {
    const component = shallow(<Input className="custom" />);
    expect(component.hasClass('boldr-form__input')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
