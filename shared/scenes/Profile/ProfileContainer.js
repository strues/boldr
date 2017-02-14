/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Loader } from '../../components';
import BaseTemplate from '../../pages/templates/Base';
import { getProfile } from '../../state/modules/users';
import { hideModal, showModal, openDrawer, closeDrawer } from '../../state/modules/boldr/ui/actions';
import Profile from './Profile';

type Props = {
  params: Object,
  user: Object,
  getProfile: Function,
  dispatch: Function,
  isFetching: Boolean,
  profile: Object,
  modal: Boolean,
  drawer: Boolean,
  openDrawer: Function,
  closeDrawer: Function,
  hideModal: Function,
  showModal: Function,
};

export class ProfileContainer extends Component {
  static fetchData(dispatch, params) {
    return Promise.all([
      dispatch(getProfile(params.username)),
    ]);
  }
  componentDidMount() {
    const { dispatch, params } = this.props;

   // Fetching data for client side rendering
    ProfileContainer.fetchData(dispatch, params);
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
      <BaseTemplate helmetMeta={ <Helmet title={ `${profile.username}'s Profile` } /> }>
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
    user: state.users.me,
    profile: state.users.profile,
    isFetching: state.users.isFetching,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProfile, openDrawer, closeDrawer, showModal, hideModal }, dispatch);
}
// $FlowIssue
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
