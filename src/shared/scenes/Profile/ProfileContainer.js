/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Loader } from 'boldr-ui';

import { BaseTemplate } from '../../templates';

import { fetchProfileIfNeeded } from '../../state';
import Profile from './Profile';

type Props = {
  params: Object,
  user: Object,
  fetchProfileIfNeeded: (username: string) => void,
  dispatch: Function,
  isFetching: boolean,
  profile: Object,
  match: Object,
};

export class ProfileContainer extends Component {
  static defaultProps: {
    match: { params: { username: '' } },
    fetchProfileIfNeeded: () => {},
  };
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.dispatch(fetchProfileIfNeeded(params.username));
  }

  props: Props;

  render() {
    const { isFetching, profile, user } = this.props;

    if (isFetching) {
      return <Loader />;
    }
    return (
      <BaseTemplate
        helmetMeta={<Helmet title={`${profile.username}'s Profile`} />}
      >
        <Profile profile={profile} email={user.email} {...this.props} />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.me,
    profile: state.users.profile,
    isFetching: state.users.isFetching,
    profileImage: state.users.profile.profileImage,
    avatarImage: state.users.profile.avatarImage,
  };
};

export default connect(mapStateToProps)(ProfileContainer);
