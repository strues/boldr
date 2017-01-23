import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import KeyVisual from './KeyVisual';

describe('(React Component) Keyvisual', () => {
  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const rernderAsset = props => <img src="http://placehold.it/300x300" { ...props } />;
    const wrapper = shallow(<KeyVisual className="test" asset={ rernderAsset }>My contents</KeyVisual>);

    expect(wrapper.find('.test').length).toBe(1);
  });

  it('should render the image.', () => {
    const rernderAsset = props => <img src="http://placehold.it/300x300" { ...props } />;
    const wrapper = shallow(<KeyVisual asset={ rernderAsset }>My contents</KeyVisual>);

    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').html()).toContain('http://placehold.it/300x300');
  });

  it('should render the children.', () => {
    const rernderAsset = props => <img src="http://placehold.it/300x300" { ...props } />;
    const wrapper = shallow(<KeyVisual asset={ rernderAsset }>My contents</KeyVisual>);

    expect(wrapper.html()).toContain('My contents');
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const rernderAsset = props => <img src="http://placehold.it/300x300" { ...props } />;
    const wrapper = mount(<KeyVisual onClick={ handler } asset={ rernderAsset }>My contents</KeyVisual>);

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });
});
