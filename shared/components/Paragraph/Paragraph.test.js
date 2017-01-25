import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Paragraph from './Paragraph';
import style from './style.css';

describe('(React Component) Paragraph', () => {
  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(<Paragraph className="test">My contents</Paragraph>);
    expect(wrapper.find('.test').length).toBe(1);
  });

  it('should render the children.', () => {
    const wrapper = shallow(<Paragraph>My contents</Paragraph>);

    expect(wrapper.html()).toContain('My contents');
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(
      <Paragraph onClick={ handler }>My contents</Paragraph>
    );

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
