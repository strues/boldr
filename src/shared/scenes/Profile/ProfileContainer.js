/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Loader } from 'boldr-ui';

import { BaseTemplate } from '../../templates';
import {
  uploadProfileImage,
  uploadAvatarImage,
} from '../../scenes/Admin/state';

import {
  fetchProfileIfNeeded,
  hideModal,
  showModal,
  toggleDrawer,
} from '../../state';
import Profile from './Profile';

type Props = {
  params: Object,
  user: Object,
  fetchProfileIfNeeded: (username: string) => void,
  dispatch: Function,
  isFetching: boolean,
  profile: Object,
  modal: boolean,
  drawer: boolean,
  match: Object,
  openDrawer: Function,
  closeDrawer: Function,
  hideModal: Function,
  showModal: Function,
  toggleDrawer: () => void,
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
  hideDrawer = () => {
    this.props.dispatch(closeDrawer());
  };
  showDrawer = () => {
    this.props.dispatch(openDrawer());
  };
  closeModal = () => {
    this.props.dispatch(hideModal());
  };
  openModal = () => {
    this.props.dispatch(showModal());
  };
  uploadAvatarImg = payload => {
    this.props.dispatch(uploadAvatarImage(payload));
  };
  handleDrawerClick = (e): Function => {
    this.props.dispatch(toggleDrawer());
  };
  uploadProfileImg = payload => {
    this.props.dispatch(uploadProfileImage(payload));
  };
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
        <Profile
          profile={profile}
          email={user.email}
          modal={this.props.modal}
          closeModal={this.closeModal}
          openModal={this.openModal}
          drawer={this.props.drawer}
          handleDrawerClick={this.handleDrawerClick}
          uploadProfileImg={this.uploadProfileImg}
          uploadAvatarImg={this.uploadAvatarImg}
          {...this.props}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.boldr.ui.modal,
    drawer: state.boldr.ui.drawer,
    user: state.users.me,
    profile: state.users.profile,
    isFetching: state.users.isFetching,
    profileImage: state.admin.attachments.profileImage,
    avatarImage: state.admin.attachments.avatarImage,
  };
};

export default connect(mapStateToProps)(ProfileContainer);
