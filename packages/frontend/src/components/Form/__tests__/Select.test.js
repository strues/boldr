import React from 'react';
import { shallow } from 'enzyme';

import { SelectInput } from '../SelectInput';

describe('SelectInput', () => {
  it('should render a div.select with select', () => {
    const component = shallow(
      <SelectInput>
        <option>My Option</option>
      </SelectInput>,
    );
    expect(
      component.contains(
        <div className="boldr-form__select">
          <SelectInput>
            <option>My Option</option>
          </SelectInput>
        </div>,
      ),
    ).toBe(false);
  });

  it('should render a div.boldr-form__select.is-disabled:disabled with select:disabled', () => {
    const component = shallow(
      <SelectInput disabled>
        <option>My Option</option>
      </SelectInput>,
    );
    expect(
      component.contains(
        <div className="boldr-form__select">
          <SelectInput disabled>
            <option>My Option</option>
          </SelectInput>
        </div>,
      ),
    ).toBe(false);
  });

  it('should render a div.select with select and modifiers', () => {
    const component = shallow(<SelectInput isSize="small" isColor="black" isLoading />);
    expect(component.hasClass('boldr-form__select')).toBe(true);
    expect(component.hasClass('is-small')).toBe(true);
  });

  it('should render a div.select with select, modifiers and custom classNames', () => {
    const component = shallow(<SelectInput disabled isLoading className="custom" />);
    expect(component.hasClass('boldr-form__select')).toBe(true);
    expect(component.hasClass('is-disabled')).toBe(true);
    expect(component.hasClass('is-loading')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });

  it('should render a div.select with select and custom classNames', () => {
    const component = shallow(<SelectInput className="custom" />);
    expect(component.hasClass('boldr-form__select')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
