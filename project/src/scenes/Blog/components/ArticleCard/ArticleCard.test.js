import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { shallowToJson } from 'enzyme-to-json';
import ArticleCard from './ArticleCard';

const articleData = {
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
  // it('accepts props and renders them.', () => {
  //   const wrapper = shallow(
  //     <ArticleCard
  //       id={articleData.id}
  //       image={articleData.image}
  //       title={articleData.title}
  //       excerpt={articleData.excerpt}
  //       slug={articleData.slug}
  //       author={articleData.author}
  //       tags={articleData.tags}
  //     />,
  //   );
  //   expect(wrapper.instance().props.image).toEqual('https://boldr.io/logo.png');
  //   expect(wrapper.instance().props.title).toEqual('This Test Slug');
  //   expect(wrapper.instance().props.excerpt).toEqual('Abcdc');
  //   expect(wrapper.instance().props.slug).toEqual('this-test-slug');
  // });
  it('matches the snapshot', () => {
    const wrapper = shallow(<ArticleCard {...articleData} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
