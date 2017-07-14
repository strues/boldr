/* @flow */

import React from 'react';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import DropdownOption from './DropdownOption';

describe('<DropdownOption />', () => {
  it('should render as an li', () => {
    expect(
      shallow(
        <DropdownOption>
          <div>abcd</div>
        </DropdownOption>,
      ).node.type,
    ).toEqual('li');
  });

  it('should click event should trigger onSelect function call', () => {
    const onSelect = spy();
    const option = mount(
      <DropdownOption onSelect={onSelect}>
        <div>abcd</div>
      </DropdownOption>,
    );
    option.childAt(0).simulate('click');
    expect(onSelect.called).toEqual(true);
  });
});
