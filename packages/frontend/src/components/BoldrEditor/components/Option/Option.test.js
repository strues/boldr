/* @flow */

import React from 'react';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import Option from './Option';

describe('<Option />', () => {
  it('should render in a div', () => {
    expect(
      shallow(
        <Option value="f" onClick={() => {}}>
          <span>abcd</span>
        </Option>,
      ).node.type,
    ).toEqual('div');
  });

  it('should have child element passed after mount', () => {
    const option = mount(
      <Option value="f" onClick={() => {}}>
        <span>abcd</span>
      </Option>,
    );
    expect(option.children().length).toEqual(1);
    expect(option.children().type()).toEqual('span');
  });

  it('should execute funcion passed in onClick props when clicked', () => {
    const onClick = spy();
    const option = mount(
      <Option value="b" onClick={onClick}>
        <span>hello</span>
      </Option>,
    );
    option.children().simulate('click');
    expect(onClick.calledOnce).toEqual(true);
  });

  it('should not execute funcion passed in onClick props when clicked if disabled', () => {
    const onClick = spy();
    const option = mount(
      <Option value="b" onClick={onClick} disabled>
        <span>hello</span>
      </Option>,
    );
    option.children().simulate('click');
    expect(onClick.called).toEqual(false);
  });
});
