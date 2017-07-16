import React from 'react';
import { shallow } from 'enzyme';

import { Help } from '../Help';

describe('Help', () => {
  it('should render a paragraph with .boldrui-form__help', () => {
    const component = shallow(<Help>My Help</Help>);
    expect(component.contains(<p className="boldrui-form__help">My Help</p>)).toBe(true);
  });

  it('should render a div with .boldrui-form__help', () => {
    const component = shallow(<Help tag="div">My Help</Help>);
    expect(component.contains(<div className="boldrui-form__help">My Help</div>)).toBe(true);
  });

  it('should render a paragraph with .boldrui-form__help and modifiers', () => {
    const component = shallow(<Help isColor="dark" />);
    expect(component.hasClass('boldrui-form__help')).toBe(true);
    expect(component.hasClass('is-dark')).toBe(true);
  });

  it('should render a paragraph with .boldrui-form__help, modifiers and classNames', () => {
    const component = shallow(<Help isColor="dark" className="custom" />);
    expect(component.hasClass('boldrui-form__help')).toBe(true);
    expect(component.hasClass('is-dark')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a paragraph with .boldrui-form__help and classNames', () => {
    const component = shallow(<Help className="custom" />);
    expect(component.hasClass('boldrui-form__help')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
