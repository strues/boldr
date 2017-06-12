import React from 'react';
import { shallow } from 'enzyme';
import Block from './Block';

describe('(React Component) Block', () => {
  it('should render all children.', () => {
    const wrapper = shallow(
      <Block>
        foo
      </Block>,
    );

    expect(wrapper.html()).toContain('foo');
  });

  it('should set the "className" prop to the wrapper if provided.', () => {
    const wrapper = shallow(
      <Block className="foobarClassName">
        foo
      </Block>,
    );

    expect(wrapper.html()).toContain('foobarClassName');
  });
});
