/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Paper from '@boldr/ui/Paper';
import Headline from '@boldr/ui/Headline';
import { Col, Row, Grid } from '@boldr/ui/Layout';
import ProfileForm from '../ProfileForm';
// import { editProfile } from '@@state/users/actions';

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
    console.log(userData);
  };
  props: Props;
  render() {
    return (
      <Paper zDepth={2}>
        <Headline type="h2">Edit your public profile</Headline>
        <ProfileForm onSubmit={this.handleFormSubmit} />
      </Paper>
    );
  }
}

export default connect()(EditProfile);
