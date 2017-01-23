import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Headline from './index';
import style from './style.css';

describe('(React Component) Headline', () => {
  it('should render the passed children.', () => {
    const wrapper = shallow(<Headline>My Contents</Headline>);

    expect(wrapper.html()).toContain('My Contents');
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(<Headline className="test">My Contents</Headline>);

    expect(wrapper.find('.test').length).toBe(1);
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

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(
      <Headline onClick={ handler }>My Contents</Headline>
    );

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
