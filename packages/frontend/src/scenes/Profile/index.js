// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import universal from 'react-universal-component';
import PROFILE_QUERY from './gql/userProfile.graphql';

const UniversalProfile = universal(import('./Profile'));

type Props = {
  loading: boolean,
  error?: Object,
  getUserByUsername: User,
};

const Profile = ({ loading, error, getUserByUsername }: Props) => (
  <UniversalProfile isLoading={loading} error={error} profile={getUserByUsername} />
);

// $FlowIssue
export default graphql(PROFILE_QUERY, {
  options: props => ({
    variables: {
      username: props.match.params.username,
    },
  }),
  props: ({ data: { loading, error, getUserByUsername } }) => ({
    loading,
    error,
    getUserByUsername,
  }),
})(Profile);
