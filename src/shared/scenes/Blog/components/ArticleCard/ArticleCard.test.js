import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ArticleCard } from './ArticleCard';

describe('<ArticleCard />', () => {
  it('renders <ArticleCard /> without breaking', () => {
    const wrapper = shallow(<ArticleCard title="blah" />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('accepts props and renders them.', () => {
    const wrapper = shallow(
      <ArticleCard
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
    const wrapper = shallow(<ArticleCard title="Test Post" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
