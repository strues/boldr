/* @flow */
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import Loader from '@boldr/ui/Loader';
import { StyleClasses } from '../../theme/styleClasses';
import type { ProfileType } from '../../types/boldr';
import ProfileContent from './components/ProfileContent';

type Props = {
  profile: ProfileType,
  isLoading?: boolean,
};
const BASE_ELEMENT = StyleClasses.PROFILE;

const Profile = ({ profile, isLoading }: Props) => {
  const classes = classnames(BASE_ELEMENT);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Helmet title={`${profile.username}'s Profile`} />
      <div className={classes}>
        <ProfileContent profile={profile} />
      </div>
    </div>
  );
};

export default Profile;
