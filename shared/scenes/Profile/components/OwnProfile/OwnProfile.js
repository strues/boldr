import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProfileForm from '../ProfileForm';
import { editProfile } from '../../../../state/modules/account/actions';

const DrawerWrapper = styled.div`
  width: 450px;
  padding: 1em;
  height: 100%;
`;
class OwnProfile extends PureComponent {
  handleFormSubmit = (values) => {
    const userData = {
      id: this.props.profile.id,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      bio: values.bio,
      location: values.location,
      website: values.website,
      profile_image: values.profileImage,
      avatar_url: values.avatarUrl,
      social: {
        facebook: { url: values.facebook },
        twitter: { url: values.twitter },
        linkedin: { url: values.linkedin },
        google: { url: values.google },
        github: { url: values.github },
      },
    };
    this.props.dispatch(editProfile(userData));
  }
  render() {
    const { profile } = this.props;
    const initialProfileData = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      email: profile.email,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      profile_image: profile.profileImage,
      avatar_url: profile.avatarUrl,
      facebook: profile.social.facebook.url,
      twitter: profile.social.twitter.url,
      github: profile.social.github.url,
      linkedin: profile.social.linkedin.url,
      google: profile.social.google.url,
    };
    return (
      <DrawerWrapper>
        Edit your public profile
        <ProfileForm onSubmit={ this.handleFormSubmit } initialValues={ initialProfileData } />
      </DrawerWrapper>
    );
  }
}

OwnProfile.propTypes = {
  dispatch: PropTypes.func,
  profile: PropTypes.object,
};

export default connect()(OwnProfile);
