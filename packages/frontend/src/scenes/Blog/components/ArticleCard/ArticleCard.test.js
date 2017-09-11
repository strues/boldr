import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { shallowToJson } from 'enzyme-to-json';
import ArticleCard from './ArticleCard';

const ArticleData = {
  id: 'c265ed52-b9c4-42e8-9b46-7bc409bfec48',
  featured: true,
  slug: 'this-test-slug',
  title: 'This Test Slug',
  image: 'https://boldr.io/logo.png',
  createdAt: '2017-09-11 04:33:36.524+00',
  excerpt: 'Abcdc',
  rawContent: {},
  tags: [{ id: 'c265ed52-b9c4-42e8-9b46-7bc409bfec33', name: 'Tag' }],
  author: {
    id: 'c265ed52-b9c4-42e8-9b46-7bc409bfec89',
    email: 'admin@boldr.io',
    profile: {
      username: 'User',
      firstName: 'Jobe',
      lastName: 'John',
      avatarUrl: 'https://boldr.io/logo.png',
    },
  },
};

describe('<ArticleCard />', () => {
  it('accepts props and renders them.', () => {
    const wrapper = shallow(<ArticleCard {...ArticleData} />);
    expect(wrapper.instance().props.image).toBe('https://boldr.io/logo.png');
    expect(wrapper.instance().props.title).toBe('This Test Slug');
    expect(wrapper.instance().props.excerpt).toBe('Abcdc');
    expect(wrapper.instance().props.slug).toBe('this-test-slug');
  });
  it('renders snapshot', () => {
    const wrapper = shallow(<ArticleCard {...ArticleData} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
