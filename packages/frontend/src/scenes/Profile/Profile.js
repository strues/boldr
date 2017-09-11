/* @flow */
import React from 'react';
import classnames from 'classnames';
import Loader from '@boldr/ui/Loader';
import Helmet from 'react-helmet';
import { StyleClasses } from '@boldr/ui';

import View from '../../components/View';
import ProfileContent from './components/ProfileContent';

type Props = {
  profile: Object,
  isLoading?: boolean,
};
const BASE_ELEMENT = StyleClasses.PROFILE;

const Profile = ({ profile, isLoading }: Props) => {
  const classes = classnames(BASE_ELEMENT);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <View>
      <Helmet title={`${profile.username}'s Profile`} />
      <div className={classes}>
        <ProfileContent profile={profile} />
      </div>
    </View>
  );
};

export default Profile;
