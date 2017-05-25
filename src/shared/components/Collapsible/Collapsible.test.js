import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import FontIcon from '../FontIcon';
import Collapsible from './Collapsible';

describe('(React Component) Collapsible', () => {
  it('should initialize with a state of {isOpen = false}.', () => {
    const wrapper = shallow(
      <Collapsible>
        TEST
      </Collapsible>,
    );

    expect(wrapper.state('isOpen')).toEqual(false);
  });

  it('should propagate the passed "className" if passed.', () => {
    const wrapper = shallow(
      <Collapsible className="test">
        TEST
      </Collapsible>,
    );

    expect(wrapper.html()).toContain('test');
  });

  it('should render the "title" if passed.', () => {
    const wrapper = shallow(
      <Collapsible title="test">
        TEST
      </Collapsible>,
    );

    expect(wrapper.html()).toContain('test');
  });

  it('should initially not render the passed children inside a contents wrapper.', () => {
    const wrapper = shallow(
      <Collapsible>
        TEST
      </Collapsible>,
    );
    const contents = wrapper.find('.boldrui-collapsible__contents');

    expect(contents.length).toBe(1);
  });

  it('should initially render the passed children inside a contents wrapper if a truthy "isOpen" prop was passed.', () => {
    const wrapper = shallow(
      <Collapsible isOpen>
        TEST
      </Collapsible>,
    );
    const contents = wrapper.find('.boldrui-collapsible__contents');

    expect(contents.length).toBe(1);
    expect(contents.html()).toContain('TEST');
  });

  it('should render an toggler anchor.', () => {
    const wrapper = shallow(
      <Collapsible>
        Foo test
      </Collapsible>,
    );

    expect(wrapper.find('a').length).toBe(1);
  });

  it('should toggle the "isOpen" state when clicking on the toggler anchor.', () => {
    const wrapper = shallow(
      <Collapsible>
        Foo test
      </Collapsible>,
    );
    const anchor = wrapper.find('a');

    anchor.simulate('click', {
      preventDefault: sinon.spy(),
    });

    expect(wrapper.state('isOpen')).toEqual(true);

    anchor.simulate('click', {
      preventDefault: sinon.spy(),
    });

    expect(wrapper.state('isOpen')).toEqual(false);
  });

  it('should render a "delete" icon in case the "onDelete" prop was passed.', () => {
    const onDelete = sinon.spy();
    const wrapper = shallow(
      <Collapsible onDelete={onDelete}>
        Foo test
      </Collapsible>,
    );
    const icons = wrapper.find(FontIcon);

    expect(icons.length).toBe(2);

    icons.at(0).simulate('click');
    expect(onDelete.calledOnce).toEqual(true);
  });
});
