/* @flow */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import ProfileForm from '../ProfileForm';
import {editProfile} from '../../../../state/modules/users/actions';

const DrawerWrapper = styled.div`
  width: 450px;
  padding: 1em;
  height: 100%;
`;
type Props = {
  dispatch: () => void,
  profile: Object,
};
class OwnProfile extends PureComponent {
  handleFormSubmit = values => {
    const userData = {
      id: this.props.profile.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      bio: values.bio,
      location: values.location,
      website: values.website,
      profileImage: values.profileImage,
      avatarUrl: values.avatarUrl,
      social: {
        facebook: {url: values.facebook},
        twitter: {url: values.twitter},
        linkedin: {url: values.linkedin},
        google: {url: values.google},
        github: {url: values.github},
      },
    };
    this.props.dispatch(editProfile(userData));
  };
  props: Props;
  render() {
    const {profile} = this.props;
    const initialProfileData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      profileImage: profile.profileImage,
      avatarUrl: profile.avatarUrl,
      facebook: profile.social.facebook.url,
      twitter: profile.social.twitter.url,
      github: profile.social.github.url,
      linkedin: profile.social.linkedin.url,
      google: profile.social.google.url,
    };
    return (
      <DrawerWrapper>
        Edit your public profile
        <ProfileForm
          onSubmit={this.handleFormSubmit}
          initialValues={initialProfileData}
        />
      </DrawerWrapper>
    );
  }
}

export default connect()(OwnProfile);
