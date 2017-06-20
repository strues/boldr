/* @flow */
import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Grid, Col, Row } from '~components/Layout';
import { StyleClasses } from '../../theme/styleClasses';
import ProfileContent from './components/ProfileContent';

type Props = {
  profile: Object,
  me: boolean,
};
const BASE_ELEMENT = StyleClasses.PROFILE;
const Profile = ({ profile, me }: Props) => {
  const classes = classnames(BASE_ELEMENT);

  return (
    <div className={classes}>
      <ProfileContent me={me} profile={profile} />
    </div>
  );
};

export default Profile;
