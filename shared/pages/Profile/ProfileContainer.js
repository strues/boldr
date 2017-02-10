/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Loader } from '../../components';
import BaseTemplate from '../templates/Base';
import { getProfile } from '../../state/modules/account/actions';
import { openDrawer, closeDrawer } from '../../state/modules/boldr/ui/actions';
import Profile from './Profile';

type Props = {
  params: Object,
  user: Object,
  getProfile: Function,
  isFetching: Boolean,
  profile: Object,
  drawer: Boolean,
  openDrawer: Function,
  closeDrawer: Function,
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
      <BaseTemplate helmetMeta={ <Helmet title={ `${user.username}'s Profile` } /> }>
      { /* $FlowIssue */}
        <Profile profile={ profile } email={ user.email } drawer={ this.props.drawer } { ...this.props } />
      </BaseTemplate>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    drawer: state.boldr.ui.drawer,
    user: state.account.user,
    profile: state.account.profile.current,
    isFetching: state.account.profile.isFetching,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProfile, openDrawer, closeDrawer }, dispatch);
}
// $FlowIssue
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
