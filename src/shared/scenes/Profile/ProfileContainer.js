/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Loader } from '../../components';
import BaseTemplate from '../../pages/templates/Base';
import { getProfile } from '../../state/modules/users';
import { uploadProfileImage, uploadAvatarImage } from '../../state/modules/attachments/actions';
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

    ProfileContainer.fetchData(dispatch, params);
  }
  hideDrawer = () => {
    this.props.dispatch(closeDrawer());
  }
  showDrawer = () => {
    this.props.dispatch(openDrawer());
  }
  closeModal = () => {
    this.props.dispatch(hideModal());
  }
  openModal = () => {
    this.props.dispatch(showModal());
  }
  uploadAvatarImg = (payload) => {
    this.props.dispatch(uploadAvatarImage(payload));
  }
  uploadProfileImg = (payload) => {
    this.props.dispatch(uploadProfileImage(payload));
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

        <Profile
          profile={ profile }
          email={ user.email }
          modal={ this.props.modal }
          closeModal={ this.closeModal }
          openModal={ this.openModal }
          drawer={ this.props.drawer }
          openDrawer={ this.showDrawer }
          closeDrawer={ this.hideDrawer }
          uploadProfileImg={ this.uploadProfileImg }
          uploadAvatarImg={ this.uploadAvatarImg }
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
    profileImage: state.attachments.profileImage,
    avatarImage: state.attachments.avatarImage,
  };
};

export default connect(mapStateToProps)(ProfileContainer);
