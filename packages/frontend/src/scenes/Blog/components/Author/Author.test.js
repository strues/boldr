import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Author from './Author';

const authorProps = {
  avatarUrl: 'abcd',
  username: 'hey',
  firstName: 'me',
  lastName: 'you',
  bio: 'bio bio',
  socialMedia: {
    facebookUrl: 'http://facebook.com',
    githubUrl: 'http://facebook.com',
    twitterUrl: 'http://facebook.com',
    linkedinUrl: 'http://facebook.com',
    googleUrl: 'http://facebook.com',
    stackoverflowUrl: 'http://facebook.com',
  },
};

describe('<Author />', () => {
  const wrapper = shallow(<Author author={authorProps} />);
  it('renders <Author /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.instance().props.author.username).toBe('hey');
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
