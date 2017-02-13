/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Loader } from '../../components';
import BaseTemplate from '../../pages/templates/Base';
import { selectUser, getProfile } from '../../state/modules/account';
import { hideModal, showModal, openDrawer, closeDrawer } from '../../state/modules/boldr/ui/actions';
import Profile from './Profile';

type Props = {
  params: Object,
  user: Object,
  getProfile: Function,
  isFetching: Boolean,
  profile: Object,
  modal: Boolean,
  drawer: Boolean,
  openDrawer: Function,
  closeDrawer: Function,
  hideModal: Function,
  showModal: Function,
};

@provideHooks({
  fetch: ({ dispatch, params: { username } }) => dispatch(getProfile(username)),
})
export class ProfileContainer extends Component {
  componentDidMount() {
    const username = this.props.params.username;

    this.props.getProfile(username);
  }
  closeModal = () => {
    this.props.hideModal();
  }
  openModal = () => {
    this.props.showModal();
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
        <Profile
          profile={ profile }
          email={ user.email }
          modal={ this.props.modal }
          closeModal={ this.closeModal }
          openModal={ this.openModal }
          drawer={ this.props.drawer }
          { ...this.props }
        />
      </BaseTemplate>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    modal: state.boldr.ui.modal,
    drawer: state.boldr.ui.drawer,
    user: selectUser(state),
    profile: state.account.profile.current,
    isFetching: state.account.profile.isFetching,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProfile, openDrawer, closeDrawer, showModal, hideModal }, dispatch);
}
// $FlowIssue
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
