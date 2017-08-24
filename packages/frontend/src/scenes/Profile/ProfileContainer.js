/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
import PROFILE_QUERY from './gql/userProfile.graphql';
import Profile from './Profile';

type Props = {
  currentUser: User,
  data: Data,
};

type Data = {
  getUserByUsername: User,
  loading: boolean,
};

export class ProfileContainer extends Component {
  props: Props;

  render() {
    const { loading, getUserByUsername } = this.props.data;

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Helmet title={`${getUserByUsername.username}'s Profile`} />
        <Profile profile={getUserByUsername} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.info,
  };
};

const ProfileContainerWithData = graphql(PROFILE_QUERY, {
  options: props => ({
    variables: {
      username: props.match.params.username,
    },
  }),
})(ProfileContainer);
export default connect(mapStateToProps)(ProfileContainerWithData);
