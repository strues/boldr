import React from 'react';
import {shallow} from 'enzyme';
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
  social: {
    facebook: {
      url: 'facebook',
    },
    twitter: {
      url: 'twitter',
    },
    google: {
      url: 'google',
    },
    linkedin: {
      url: 'linkedin',
    },
    github: {
      url: 'github',
    },
  },
};
test('<ProfileContent />, renders the content area', () => {
  const toggleDrawer = jest.fn();

  const wrapper = shallow(
    <ProfileContent
      me={false}
      toggleDrawer={toggleDrawer}
      profile={mockProfile}
    />,
  );
  expect(wrapper.is('.boldr-profile__content')).toEqual(true);
});
