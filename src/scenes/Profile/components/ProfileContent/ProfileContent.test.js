import React from 'react';
import { shallow } from 'enzyme';
import ProfileContent from './ProfileContent';

const mockProfile = {
  id: '12asdf-234casdf',
  bio: 'abcd',
  firstName: 'test',
  lastName: 'tester',
  location: 'somewhere',
  website: 'www.com',
  avatarUrl: 'www.com/image.png',
  backgroundImage: 'www.com/png',
  socialMedia: {
    facebookUrl: 'facebook',
    twitterUrl: 'facebook',
    googleUrl: 'facebook',
    githubUrl: 'facebook',
  },
};
test('<ProfileContent />, renders the content area', () => {
  const wrapper = shallow(<ProfileContent me={false} profile={mockProfile} />);
  expect(wrapper.is('.boldr-profile__content')).toEqual(true);
});
