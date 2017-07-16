import React from 'react';
import { shallow } from 'enzyme';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('should render a label.checkbox with input[type="checkbox"]', () => {
    const component = shallow(<Checkbox>My Checkbox</Checkbox>);
    expect(
      component.contains(
        <label className="boldrui-form__checkbox" disabled={undefined}>
          <input type="checkbox" />My Checkbox
        </label>,
      ),
    ).toBe(true);
  });

  it('should render a label.checkbox:disabled with input[type="checkbox"]:disabled', () => {
    const component = shallow(<Checkbox disabled>My Checkbox</Checkbox>);
    expect(
      component.contains(
        <label className="boldrui-form__checkbox" disabled>
          <input type="checkbox" disabled />My Checkbox
        </label>,
      ),
    ).toBe(true);
  });

  it('should render a label.checkbox with input[type="checkbox"] and custom classNames', () => {
    const component = shallow(<Checkbox className="custom" />);
    expect(component.hasClass('boldrui-form__checkbox')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
