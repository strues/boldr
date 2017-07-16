import React from 'react';
import { shallow } from 'enzyme';

import { Control } from '../Control';

describe('Control', () => {
  it('should render a div with .boldrui-form__control', () => {
    const component = shallow(
      <Control>
        <span>Any Content</span>
      </Control>,
    );
    expect(
      component.contains(
        <div className="boldrui-form__control">
          <span>Any Content</span>
        </div>,
      ),
    ).toBe(true);
  });

  it('should render a p with .boldrui-form__control', () => {
    const component = shallow(
      <Control tag="p">
        <span>Any Content</span>
      </Control>,
    );
    expect(
      component.contains(
        <p className="boldrui-form__control">
          <span>Any Content</span>
        </p>,
      ),
    ).toBe(true);
  });

  it('should render a div with .boldrui-form__control and .has-icons-left.has-icons.right', () => {
    const component = shallow(<Control hasIcons />);
    expect(component.hasClass('boldrui-form__control')).toBe(true);
    expect(component.hasClass('has-icons-left')).toBe(true);
    expect(component.hasClass('has-icons-right')).toBe(true);
  });

  it('should render a div with .boldrui-form__control and modifiers Array', () => {
    const component = shallow(
      <Control isExpanded isLoading hasIcons={['left', 'right']}>
        <span>Any Content</span>
      </Control>,
    );
    expect(component.hasClass('boldrui-form__control')).toBe(true);
    expect(component.hasClass('is-expanded')).toBe(true);
    expect(component.hasClass('is-loading')).toBe(true);
    expect(component.hasClass('has-icons-left')).toBe(true);
    expect(component.hasClass('has-icons-right')).toBe(true);
  });

  it('should render a div with .boldrui-form__control and modifiers String', () => {
    const component = shallow(
      <Control isExpanded isLoading hasIcons="right">
        <span>Any Content</span>
      </Control>,
    );
    expect(component.hasClass('boldrui-form__control')).toBe(true);
    expect(component.hasClass('is-expanded')).toBe(true);
    expect(component.hasClass('is-loading')).toBe(true);
    expect(component.hasClass('has-icons-right')).toBe(true);
  });

  it('should render a div with .boldrui-form__control and modifiers with Bad Icons String', () => {
    const component = shallow(
      <Control isExpanded isLoading hasIcons="bad">
        <span>Any Content</span>
      </Control>,
    );
    expect(component.hasClass('boldrui-form__control')).toBe(true);
    expect(component.hasClass('is-expanded')).toBe(true);
    expect(component.hasClass('is-loading')).toBe(true);
  });

  it('should render a div with .boldrui-form__control and modifiers with Bad Icons Array', () => {
    const component = shallow(
      <Control isExpanded isLoading hasIcons={['right', 'bad']}>
        <span>Any Content</span>
      </Control>,
    );
    expect(component.hasClass('boldrui-form__control')).toBe(true);
    expect(component.hasClass('is-expanded')).toBe(true);
    expect(component.hasClass('is-loading')).toBe(true);
  });

  it('should render a div with .boldrui-form__control, modifiers and custom classNames', () => {
    const component = shallow(<Control isExpanded className="custom loader" />);
    expect(component.hasClass('boldrui-form__control')).toBe(true);
    expect(component.hasClass('is-expanded')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
    expect(component.hasClass('loader')).toBe(true);
  });

  it('should render a div with .boldrui-form__control and custom classNames', () => {
    const component = shallow(
      <Control className="custom loader">
        <span>Any Content</span>
      </Control>,
    );
    expect(component.hasClass('boldrui-form__control')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
    expect(component.hasClass('loader')).toBe(true);
  });
});
