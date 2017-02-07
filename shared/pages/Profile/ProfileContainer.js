/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { Loader } from '../../components';
import BaseTemplate from '../templates/Base';
import { getProfile } from '../../state/modules/account/actions';
import Profile from './Profile';

type Props = {
  params: Object,
  user: Object,
  getProfile: Function,
  isFetching: Boolean,
  profile: Object,
};

@provideHooks({
  fetch: ({ dispatch, params: { username } }) => dispatch(getProfile(username)),
})
export class ProfileContainer extends Component {
  componentDidMount() {
    const username = this.props.params.username;

    this.props.getProfile(username);
  }
  props: Props;

  render() {
    const { isFetching, profile, user } = this.props;

    if (isFetching) {
      return (
        <Loader />
      );
    }
    return (
      <BaseTemplate helmetMeta={ <Helmet title="Profile" /> }>
        <Profile profile={ profile } email={ user.email } />
      </BaseTemplate>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.account.user,
    profile: state.account.profile.current,
    isFetching: state.account.profile.isFetching,
  };
};

export default connect(mapStateToProps, { getProfile })(ProfileContainer);
