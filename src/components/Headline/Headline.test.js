import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Headline from './Headline';

describe('(React Component) Headline', () => {
  it('should render the passed children.', () => {
    const wrapper = shallow(<Headline>My Contents</Headline>);

    expect(wrapper.html()).toContain('My Contents');
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(<Headline className="test">My Contents</Headline>);
    expect(wrapper.is('.test')).toBe(true);
  });

  it('should render a semantically first level heading if no type was specified.', () => {
    const wrapper = shallow(<Headline>My Contents</Headline>);

    expect(wrapper.type()).toEqual('h1');
  });

  it('should render the aossicated semantically heading tag if a type prop was specified.', () => {
    let wrapper = shallow(<Headline type="h2">My Contents</Headline>);

    expect(wrapper.type()).toEqual('h2');

    wrapper = shallow(<Headline type="h4">My Contents</Headline>);
    expect(wrapper.type()).toEqual('h4');
  });

  it('should add the associated type className to the node.', () => {
    let wrapper = shallow(<Headline>My Contents</Headline>);
    expect(wrapper.is('.h1')).toBe(true);

    wrapper = shallow(<Headline type="h2">My Contents</Headline>);
    expect(wrapper.is('.h2')).toBe(true);

    wrapper = shallow(<Headline type="h3">My Contents</Headline>);
    expect(wrapper.is('.h3')).toBe(true);

    wrapper = shallow(<Headline type="h4">My Contents</Headline>);
    expect(wrapper.is('.h4')).toBe(true);

    wrapper = shallow(<Headline type="h5">My Contents</Headline>);
    expect(wrapper.is('.h5')).toBe(true);

    wrapper = shallow(<Headline type="h6">My Contents</Headline>);
    expect(wrapper.is('.h6')).toBe(true);
  });

  it('should override the associated type className if a "theme" prop was passed.', () => {
    const wrapper = shallow(<Headline theme="h4">My Contents</Headline>);
    expect(wrapper.is('.h4')).toBe(true);
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(<Headline onClick={handler}>My Contents</Headline>);

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
