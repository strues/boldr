import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Flag from './Flag';

describe('<Flag />', () => {
  let requiredProps = {};

  beforeEach(() => {
    requiredProps = {
      asset: props => <img src="http://placehold.it/300x300" {...props} />,
    };
  });

  it('should render the passed label.', () => {
    const wrapper = shallow(<Flag {...requiredProps}>My Contents</Flag>);

    expect(wrapper.html()).toContain('My Contents');
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(
      <Flag {...requiredProps} className="test">My Contents</Flag>,
    );

    expect(wrapper.is('.test')).toEqual(true);
  });

  it('should render the image.', () => {
    const wrapper = shallow(<Flag {...requiredProps}>My Contents</Flag>);
    const image = wrapper.find('.boldrui-flag__img');

    expect(image.length).toBe(1);
    expect(image.html()).toContain('http://placehold.it/300x300');
  });
  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = mount(
      <Flag {...requiredProps} onClick={handler}>My Contents</Flag>,
    );

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
