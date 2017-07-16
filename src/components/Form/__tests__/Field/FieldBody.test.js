import React from 'react';
import { shallow } from 'enzyme';

import { FieldBody } from '../../Field/FieldBody';

describe('FieldBody', () => {
  it('should render a div with .boldrui-form__field-body', () => {
    const component = shallow(
      <FieldBody>
        <span>Any Content</span>
      </FieldBody>,
    );
    expect(
      component.contains(
        <div className="boldrui-form__field-body">
          <span>Any Content</span>
        </div>,
      ),
    ).toBe(true);
  });

  it('should render a p with .boldrui-form__field-body', () => {
    const component = shallow(
      <FieldBody tag="p">
        <span>Any Content</span>
      </FieldBody>,
    );
    expect(
      component.contains(
        <p className="boldrui-form__field-body">
          <span>Any Content</span>
        </p>,
      ),
    ).toBe(true);
  });

  it('should render a div with .boldrui-form__field-body and custom classNames', () => {
    const component = shallow(
      <FieldBody className="custom">
        <span>Any Content</span>
      </FieldBody>,
    );
    expect(component.hasClass('boldrui-form__field-body')).toBe(true);
    expect(component.hasClass('custom')).toBe(true);
  });
});
