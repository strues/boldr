import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Heading from './Heading';

describe('(React Component) Heading', () => {
  it('should render the passed children.', () => {
    const wrapper = shallow(<Heading text="My Contents" />);

    expect(wrapper.html()).toContain('My Contents');
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(<Heading className="test" text="My Contents" />);
    expect(wrapper.is('.test')).toBe(true);
  });

  it('should render a semantically first level heading if no type was specified.', () => {
    const wrapper = shallow(<Heading text="My Contents" />);

    expect(wrapper.type()).toEqual('h1');
  });

  it('should render the aossicated semantically heading tag if a type prop was specified.', () => {
    let wrapper = shallow(<Heading type="h2" text="My Contents" />);

    expect(wrapper.type()).toEqual('h2');

    wrapper = shallow(<Heading type="h4" text="My Contents" />);
    expect(wrapper.type()).toEqual('h4');
  });

  it('should add the associated type className to the node.', () => {
    let wrapper = shallow(<Heading>My Contents</Heading>);
    expect(wrapper.is('.boldr-h1')).toBe(true);

    wrapper = shallow(<Heading type="h2" text="My Contents" />);
    expect(wrapper.is('.boldr-h2')).toBe(true);

    wrapper = shallow(<Heading type="h3" text="My Contents" />);
    expect(wrapper.is('.boldr-h3')).toBe(true);

    wrapper = shallow(<Heading type="h4" text="My Contents" />);
    expect(wrapper.is('.boldr-h4')).toBe(true);

    wrapper = shallow(<Heading type="h5" text="My Contents" />);
    expect(wrapper.is('.boldr-h5')).toBe(true);

    wrapper = shallow(<Heading type="h6" text="My Contents" />);
    expect(wrapper.is('.boldr-h6')).toBe(true);
  });

  it('should override the associated type className if a "theme" prop was passed.', () => {
    const wrapper = shallow(<Heading theme="example" text="My Contents" />);
    expect(wrapper.is('.example')).toBe(true);
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(<Heading onClick={handler} text="My Contents" />);

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
