import React from 'react';
import {createStore} from 'redux';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {PostCard} from './PostCard';

describe('<PostCard />', () => {
  it('renders <PostCard /> without breaking', () => {
    const wrapper = shallow(<PostCard title="blah" />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('accepts props and renders them.', () => {
    const wrapper = shallow(
      <PostCard
        feature_image="http://boldr.io/images/logo.png"
        title="Test Post"
        excerpt="An excerpt"
        slug="test-post"
      />,
    );
    expect(wrapper.instance().props.feature_image).toBe(
      'http://boldr.io/images/logo.png',
    );
    expect(wrapper.instance().props.title).toBe('Test Post');
    expect(wrapper.instance().props.excerpt).toBe('An excerpt');
    expect(wrapper.instance().props.slug).toBe('test-post');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<PostCard title="Test Post" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
