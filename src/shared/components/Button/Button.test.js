import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Link as RouterLink } from 'react-router-dom';
import Loader from '../Loader';
import Button from './Button';

describe('(React Component) Button', () => {
  it('should render the passed contents.', () => {
    const wrapper = shallow(<Button>test</Button>);

    expect(wrapper.text()).toContain('test');
  });

  it('should render a semantic button element.', () => {
    const wrapper = shallow(<Button>test</Button>);

    expect(wrapper.type()).toEqual('button');
  });

  it('should render a anchor element in case the "isAnchor" prop is truthy.', () => {
    const wrapper = shallow(<Button isAnchor>test</Button>);

    expect(wrapper.type()).toEqual('a');
  });

  it('should render a Link component in case the "to" prop is provided.', () => {
    const wrapper = shallow(<Button to="/foo">test</Button>);

    expect(wrapper.type()).toEqual(RouterLink);
  });

  it('should add the passed "className" prop to the rendered button if passed.', () => {
    const btn = shallow(<Button className="test">test</Button>);
    expect(btn.is('.test')).toBe(true);
  });

  it('should render an "aria-disabled" attribute on the Link component in case the "disabled" prop is truthy.', () => {
    const wrapper = shallow(<Button to="/foo" disabled>test</Button>);

    expect(wrapper.prop('aria-disabled')).toEqual(true);
  });

  it('should not render an "disabled" attribute on the Link component in case the "disabled" prop is truthy.', () => {
    const wrapper = shallow(<Button to="/foo" disabled>test</Button>);

    expect(wrapper.prop('disabled')).toEqual(undefined);
  });

  it('should render an "disabled" attribute on the Button component in case the "disabled" prop is truthy.', () => {
    const wrapper = shallow(<Button disabled>test</Button>);

    expect(wrapper.prop('disabled')).toEqual(true);
  });

  it('should not render an "aria-disabled" attribute on the Button component in case the "disabled" prop is truthy.', () => {
    const wrapper = shallow(<Button disabled>test</Button>);

    expect(wrapper.prop('aria-disabled')).toEqual(true);
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(<Button onClick={handler}>test</Button>);

    wrapper.find('button').simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
