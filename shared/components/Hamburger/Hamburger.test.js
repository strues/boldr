import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Hamburger from './Hamburger';
import style from './style.css';

describe('(React Component) Hamburger', () => {
  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(<Hamburger className="test" />);
    expect(wrapper.find('.test').length).toBe(1);
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(
  <Hamburger onClick={ handler }>My Contents</Hamburger>
  );

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
