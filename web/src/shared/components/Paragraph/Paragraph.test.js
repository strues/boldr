import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Paragraph from './Paragraph';

describe('(React Component) Paragraph', () => {
  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(
      <Paragraph className="test">My contents</Paragraph>,
    );
    expect(wrapper.is('.test')).toBe(true);
  });

  it('should render the children.', () => {
    const wrapper = shallow(<Paragraph>My contents</Paragraph>);

    expect(wrapper.html()).toContain('My contents');
  });

  it('should add the "lead" className if the "isLead" prop is truthy.', () => {
    const wrapper = shallow(<Paragraph isLead>My contents</Paragraph>);
    expect(wrapper.is('.boldrui-paragraph__lead')).toBe(true);
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(<Paragraph onClick={handler}>My contents</Paragraph>);

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
