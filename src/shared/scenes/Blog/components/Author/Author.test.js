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
  social: {
    facebook: {
      url: 'asf',
    },
    twitter: {
      url: 'asf',
    },
    google: {
      url: 'asf',
    },
    github: {
      url: 'asf',
    },
    linkedin: {
      url: 'asf',
    },
  },
};

describe('<Author />', () => {
  const wrapper = shallow(<Author {...authorProps} />);
  it('renders <Author /> without breaking', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.instance().props.username).toBe('hey');
  });
  it('renders snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
