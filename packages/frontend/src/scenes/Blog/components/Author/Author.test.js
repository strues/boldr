import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Author from './Author';

const authorProps = {
  id: 'c265ed52-b9c4-42e8-9b46-7bc409bfec89',
  email: 'admin@boldr.io',
  profile: {
    id: 'c265ed52-b9c4-42e8-9b46-7bc409bfec88',
    accountId: 'c265ed52-b9c4-42e8-9b46-7bc409bfec89',
    username: 'User',
    firstName: 'Jobe',
    lastName: 'John',
    avatarUrl: 'https://boldr.io/logo.png',
    bio: 'bio bio',
    socialMedia: {
      facebookUrl: 'http://facebook.com',
      githubUrl: 'http://facebook.com',
      twitterUrl: 'http://facebook.com',
      linkedinUrl: 'http://facebook.com',
      googleUrl: 'http://facebook.com',
      stackoverflowUrl: 'http://facebook.com',
    },
  },
};

describe('<Author />', () => {
  const wrapper = shallow(<Author author={authorProps} />);
  it('renders <Author /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.instance().props.author.profile.username).toBe('User');
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
