/* @flow */
import React from 'react';
import classnames from 'classnames';
import { StyleClasses } from '@boldr/ui';
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
