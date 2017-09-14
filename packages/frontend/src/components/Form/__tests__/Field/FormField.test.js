import React from 'react';
import { shallow } from 'enzyme';

import { FormField } from '../../Field/FormField';

describe('FormField', () => {
  it('should render a div with .boldr-form__field', () => {
    const component = shallow(
      <FormField>
        <span>Any Content</span>
      </FormField>,
    );
    expect(
      component.contains(
        <div className="boldr-form__field">
          <span>Any Content</span>
        </div>,
      ),
    ).toBe(true);
  });

  it('should render a div with .boldr-form__field and modifiers', () => {
    const component = shallow(<FormField isGrouped hasAddons isHorizontal />);
    expect(component.hasClass('boldr-form__field')).toBe(true);
    expect(component.hasClass('is-grouped')).toBe(true);
    expect(component.hasClass('has-addons')).toBe(true);
    expect(component.hasClass('is-horizontal')).toBe(true);
  });

  it('should render a div with .boldr-form__field and .has-addons-right', () => {
    const component = shallow(<FormField isGrouped="right" hasAddons="fullwidth" />);
    expect(component.hasClass('boldr-form__field')).toBe(true);
    expect(component.hasClass('is-grouped')).toBe(true);
    expect(component.hasClass('is-grouped-right')).toBe(true);
    expect(component.hasClass('has-addons')).toBe(true);
    expect(component.hasClass('has-addons-fullwidth')).toBe(true);
  });

  it('should render a div with .boldr-form__field and .has-addons-right', () => {
    const component = shallow(<FormField isGrouped="lol" />);
    expect(component.hasClass('boldr-form__field')).toBe(true);
    expect(component.hasClass('is-grouped')).toBe(false);
    expect(component.hasClass('is-grouped-lol')).toBe(false);
  });

  it('should render a p with .boldr-form__field, modifiers and custom classNames', () => {
    const component = shallow(
      <FormField tag="p" isGrouped className="custom">
        <span>Any Content</span>
      </FormField>,
    );
    expect(component.is('p')).toBe(true);
    expect(component.hasClass('boldr-form__field')).toBe(true);
    expect(component.hasClass('is-grouped')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a div with .boldr-form__field, modifiers and custom classNames', () => {
    const component = shallow(
      <FormField isGrouped className="custom">
        <span>Any Content</span>
      </FormField>,
    );
    expect(component.hasClass('boldr-form__field')).toBe(true);
    expect(component.hasClass('is-grouped')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a div with .boldr-form__field and custom classNames', () => {
    const component = shallow(
      <FormField className="custom">
        <span>Any Content</span>
      </FormField>,
    );
    expect(component.hasClass('boldr-form__field')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
