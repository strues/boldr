/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { gql, graphql } from 'react-apollo';
import Loader from '@@components/Loader';
import Profile from './Profile';

type Props = {
  user: User,
  data: Data,
  match: Object,
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
    user: {
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
    const userEmail = this.props.user.email;
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
    user: state.users.me,
  };
};

const PROFILE_QUERY = gql`
query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id,
      email,
      username,
      firstName,
      lastName,
      avatarUrl,
      profileImage,
      bio,
      location,
      website,
      roles {
        name
      },
      socialMedia {
        facebookUrl,
        githubUrl,
        twitterUrl,
        linkedinUrl,
        googleUrl,
        stackoverflowUrl
      }
    }
}
`;
const ProfileContainerWithData = graphql(PROFILE_QUERY, {
  options: props => ({
    variables: {
      username: props.match.params.username,
    },
  }),
})(ProfileContainer);
export default connect(mapStateToProps)(ProfileContainerWithData);
