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

type State = {
  me: boolean,
};
export class ProfileContainer extends Component {
  static defaultProps = {
    currentUser: {
      email: '',
    },
    data: {
      getUserByUsername: {
        email: '',
      },
    },
  };
  constructor() {
    super();

    this.state = {
      me: false,
    };
    (this: any).setMe = this.setMe.bind(this);
  }
  state: State;

  componentDidMount() {
    this.setMe();
  }

  props: Props;

  setMe() {
    const userEmail = this.props.currentUser.email || null;
    const profEmail = this.props.data.loading ? '' : this.props.data.getUserByUsername.email;
    const isMe = userEmail === profEmail;
    this.setState({
      me: isMe,
    });
  }
  render() {
    const { loading, getUserByUsername } = this.props.data;

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Helmet title={`${getUserByUsername.username}'s Profile`} />
        <Profile profile={getUserByUsername} me={this.state.me} />
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
