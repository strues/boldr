/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Col, Row, Grid } from '~components/Layout';
import ProfileForm from '../ProfileForm';
import { editProfile } from '~state/modules/users/actions';

type Props = {
  dispatch: () => void,
  profile: Object,
};

class EditProfile extends PureComponent {
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
        facebook: { url: values.facebook },
        twitter: { url: values.twitter },
        linkedin: { url: values.linkedin },
        google: { url: values.google },
        github: { url: values.github },
      },
    };
    this.props.dispatch(editProfile(userData));
  };
  props: Props;
  render() {
    return (
      <div>
        Edit your public profile
        <ProfileForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default connect()(EditProfile);
