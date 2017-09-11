import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { shallowToJson } from 'enzyme-to-json';
import ArticleCard from './ArticleCard';

const ArticleData = {
  image: 'http://boldr.io/images/logo.png',
  title: 'Test Post',
  excerpt: 'An excerpt',
  slug: 'test-post',
  tags: [{ name: 'abc', id: 1 }],
  author: {
    username: 'joe',
    firstName: 'Joe',
    avatarUrl: 'http://boldr.io/images/logo.png',
  },
};

describe('<ArticleCard />', () => {
  it('renders <ArticleCard /> without breaking', () => {
    const wrapper = shallow(<ArticleCard {...ArticleData} />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('accepts props and renders them.', () => {
    const wrapper = shallow(<ArticleCard {...ArticleData} />);
    expect(wrapper.instance().props.image).toBe('http://boldr.io/images/logo.png');
    expect(wrapper.instance().props.title).toBe('Test Post');
    expect(wrapper.instance().props.excerpt).toBe('An excerpt');
    expect(wrapper.instance().props.slug).toBe('test-post');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<ArticleCard {...ArticleData} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
