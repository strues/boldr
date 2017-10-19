// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import type { ProfileType } from '../../types/boldr';
import PROFILE_QUERY from './gql/userProfile.graphql';

const UniversalProfile = universal(import('./Profile'));

type Props = {
  loading: boolean,
  error?: Object,
  profile: ProfileType,
};

const Profile = ({ loading, error, profile }: Props) => (
  <UniversalProfile isLoading={loading} error={error} profile={profile} />
);

// $FlowIssue
export default graphql(PROFILE_QUERY, {
  options: props => ({
    variables: {
      username: props.match.params.username,
    },
  }),
  props: ({ data: { loading, error, profile } }) => ({
    loading,
    error,
    profile,
  }),
})(Profile);
