import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ArticleCard } from './ArticleCard';

const ArticleData = {
  featureImage: 'http://boldr.io/images/logo.png',
  title: 'Test Post',
  excerpt: 'An excerpt',
  slug: 'test-post',
  tags: [{ name: 'abc', id: 1 }],
};

describe('<ArticleCard />', () => {
  it('renders <ArticleCard /> without breaking', () => {
    const wrapper = shallow(<ArticleCard article={ArticleData} />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('accepts props and renders them.', () => {
    const wrapper = shallow(<ArticleCard article={ArticleData} />);
    expect(wrapper.instance().props.article.featureImage).toBe('http://boldr.io/images/logo.png');
    expect(wrapper.instance().props.article.title).toBe('Test Post');
    expect(wrapper.instance().props.article.excerpt).toBe('An excerpt');
    expect(wrapper.instance().props.article.slug).toBe('test-post');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<ArticleCard article={ArticleData} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
