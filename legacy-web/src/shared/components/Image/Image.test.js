import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import VisibilitySensor from 'react-visibility-sensor';
import Image from './Image';

describe('(React Component) Image', () => {
  it('should initialize with a state of isInViewport: false.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist;
 attraction in Rome"
        width={200}
        height={150}
      />,
    );

    expect(wrapper.state('isInViewport')).toEqual(false);
  });

  it('should initialize with a state of isImageLoaded: false.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
      />,
    );

    expect(wrapper.state('isImageLoaded')).toEqual(false);
  });

  it('should render a <picture/> tag with an <img/> inside if no queries where passed.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
      />,
    );
    const img = wrapper.find('img');

    expect(wrapper.type()).toEqual('picture');
    expect(img.length).toBe(1);
    expect(img.prop('src')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?w=2&h=1.5&fit=crop&crop=entropy&auto=format&q=60',
    );
  });

  it('should respect the lazyDivideFactor prop when calculating the size of the lazy image.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        lazyDivideFactor={1000}
      />,
    );
    const img = wrapper.find('img');

    expect(img.prop('src')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?w=0.2&h=0.15&fit=crop&crop=entropy&auto=format&q=60',
    );
  });

  it('should respect the lazySrc prop when passed.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        lazySrc="http://i.magaimg.net/img/frn.jpg?h=10&w=14"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        lazyDivideFactor={1000}
      />,
    );
    const img = wrapper.find('img');

    expect(img.prop('src')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?h=10&w=14',
    );
  });

  it('should render the real image size if the isLazy prop is falsy.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        isLazy={false}
      />,
    );
    const img = wrapper.find('img');

    expect(img.prop('src')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?w=200&h=150&fit=crop&crop=entropy&auto=format&q=60',
    );
  });

  it('should add the passed "className" prop to the rendered node if passed.', () => {
    const wrapper = shallow(
      <Image
        className="test"
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        queries={[
          { minWidth: 600, width: 600, height: 350, quality: 60 },
          { minWidth: 900, width: 900, height: 600, quality: 60 },
        ]}
      />,
    );
    expect(wrapper.is('.test')).toBe(true);
  });

  it('should render a <VisibilitySensor/> which will call the contexts handleViewportVisibilityChange() method.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
      />,
    );
    const sensor = wrapper.find(VisibilitySensor);

    expect(sensor.length).toBe(1);
    expect(sensor.prop('onChange')).toEqual(
      wrapper.instance().handleViewportVisibilityChange,
    );
  });

  it('should not render a <VisibilitySensor/> if the image is already within the users viewport.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
      />,
    );

    wrapper.setState({ isInViewport: true });

    const sensor = wrapper.find(VisibilitySensor);

    expect(sensor.length).toBe(0);
  });

  it('should render a the real image width and height src if the isInViewport state is truthy.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
      />,
    );

    wrapper.setState({ isInViewport: true });

    const img = wrapper.find('img');

    expect(img.prop('src')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?w=200&h=150&fit=crop&crop=entropy&auto=format&q=60',
    );
  });

  it('should not append the URL query question mark twice if it is already included in the src.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg?foo=bar"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
      />,
    );

    expect(wrapper.find('img').prop('src')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?foo=bar&w=2&h=1.5&fit=crop&crop=entropy&auto=format&q=60',
    );
  });

  it('should render a <picutre/> and without any <source/> tags if the isInViewport is not truthy.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        queries={[
          { minWidth: 600, width: 600, height: 350, quality: 60 },
          { minWidth: 900, width: 900, height: 600, quality: 60 },
        ]}
      />,
    );
    const sources = wrapper.find('source');

    expect(wrapper.type()).toEqual('picture');
  });

  it('should render a <picutre/> and <source/> for each query if the isInViewport is truthy.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        queries={[
          { minWidth: 600, width: 600, height: 350, quality: 60 },
          { minWidth: 900, width: 900, height: 600, quality: 60 },
        ]}
      />,
    );

    wrapper.setState({ isInViewport: true });

    const sources = wrapper.find('source');

    expect(wrapper.type()).toEqual('picture');
    expect(sources.length).toBe(2);
    expect(sources.at(0).prop('srcSet')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?w=600&h=350&fit=crop&crop=entropy&auto=format&q=60 1x, http://i.magaimg.net/img/frn.jpg?w=600&h=350&fit=crop&crop=entropy&auto=format&q=60&dpr=2 2x',
    );
    expect(sources.at(0).prop('media')).toEqual(
      '(min-width: 600px) AND (max-width: 899px)',
    );
  });

  it('should render a <picutre/> and <source/> for each query if the isLazy prop is falsy.', () => {
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        queries={[
          { minWidth: 600, width: 600, height: 350, quality: 60 },
          { minWidth: 900, width: 900, height: 600, quality: 60 },
        ]}
        isLazy={false}
      />,
    );

    const sources = wrapper.find('source');

    expect(wrapper.type()).toEqual('picture');
    expect(sources.length).toBe(2);
    expect(sources.at(0).prop('srcSet')).toEqual(
      'http://i.magaimg.net/img/frn.jpg?w=600&h=350&fit=crop&crop=entropy&auto=format&q=60 1x, http://i.magaimg.net/img/frn.jpg?w=600&h=350&fit=crop&crop=entropy&auto=format&q=60&dpr=2 2x',
    );
    expect(sources.at(0).prop('media')).toEqual(
      '(min-width: 600px) AND (max-width: 899px)',
    );
  });

  it('handleImageLoaded() should set the isImageLoaded state to true and call the onLoad prop if provided.', () => {
    const onLoad = sinon.spy();
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        onLoad={onLoad}
      />,
    );

    wrapper.instance().handleImageLoaded();

    expect(wrapper.state('isImageLoaded')).toEqual(true);
    expect(onLoad.callCount).toEqual(1);
  });

  it('handleViewportVisibilityChange() should set the isInViewport state to the given value if it is truthy.', () => {
    const onLoad = sinon.spy();
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        onLoad={onLoad}
      />,
    );

    wrapper.instance().handleViewportVisibilityChange(true);

    expect(wrapper.state('isInViewport')).toEqual(true);
  });

  it('handleViewportVisibilityChange() should not modify set the isInViewport state if the given value is not truthy.', () => {
    const onLoad = sinon.spy();
    const wrapper = shallow(
      <Image
        src="http://i.magaimg.net/img/frn.jpg"
        alt="A beautiful image of a tourist attraction in Rome"
        width={200}
        height={150}
        onLoad={onLoad}
      />,
    );

    wrapper.instance().handleViewportVisibilityChange(true);
    wrapper.instance().handleViewportVisibilityChange(false);

    expect(wrapper.state('isInViewport')).toEqual(true);
  });
});
