import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Headline from '../Headline';
import Paragraph from '../Paragraph';
import Card from './Card';

describe('(React Component) Card', () => {
  let requiredProps = {};

  beforeEach(() => {
    requiredProps = {
      to: '/page',
      history: {},
      title: 'Best page',
      text: 'This Card teases a different page with an image, a headline and a short descrition.',
      asset: props => <img src="http://placehold.it/350x150" {...props} />,
    };
  });

  it('should render the image.', () => {
    const wrapper = shallow(<Card {...requiredProps} />);
    const image = wrapper.find('img');

    expect(image.length).toBe(1);
    expect(image.html()).toContain('http://placehold.it/350x150');
  });

  it('should render the title.', () => {
    const wrapper = shallow(<Card {...requiredProps} />);
    const headline = wrapper.find(Headline);

    expect(headline.length).toBe(1);
    expect(headline.html()).toContain('Best page');
  });

  it('should respect the "headlineType" prop when rendering the title.', () => {
    const wrapper = shallow(<Card {...requiredProps} headlineType="h5" />);
    const headline = wrapper.find(Headline);

    expect(headline.prop('type')).toEqual('h5');
  });

  it('should render the text.', () => {
    const wrapper = shallow(<Card {...requiredProps} />);
    const paragraph = wrapper.find(Paragraph);

    expect(paragraph.length).toBe(1);
    expect(paragraph.html()).toContain(
      'This Card teases a different page with an image, a headline and a short descrition.',
    );
  });

  it('should propagate props to the wrapper element.', () => {
    const handler = sinon.spy();
    const wrapper = shallow(<Card {...requiredProps} onClick={handler} />);

    wrapper.simulate('click');

    expect(handler.calledOnce).toEqual(true);
  });

  it('should render the actions if passed.', () => {
    const actions = <button>Foo</button>;
    const wrapper = shallow(<Card {...requiredProps} actions={actions} />);

    expect(wrapper.find('button').length).toBe(1);
  });
});
