/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Loader from '@boldr/ui/Loader';
// internal
import { toggleModal } from '@boldr/core';
import { makeSelectModal, makeSelectCurrentMember } from '../state/selectors/adminSelectors';
import type { UserType, UsersType } from '../../../types/boldr';
import { memberSelected, updateMember } from '../state';
import Members from './Members';
import MEMBERS_QUERY from './users.graphql';

type Data = {
  accounts: UsersType,
  loading: boolean,
};

export type Props = {
  data: Data,
  currentMember: UserType,
  dispatch: Function,
  isModalVisible: boolean,
};

export class MembersContainer extends Component<Props, *> {
  static defaultProps: {
    profile: {},
    fetchMembersIfNeeded: () => {},
  };

  props: Props;

  closeModal = () => {
    this.props.dispatch(toggleModal());
  };
  openModal = () => {
    this.props.dispatch(toggleModal());
  };

  toggleUser = (account: UserType) => {
    const { dispatch } = this.props;
    dispatch(memberSelected(account));
    dispatch(toggleModal());
  };

  handleSubmit = (values: Object) => {
    const accData = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      id: this.props.currentMember.id,
    };

    this.props.dispatch(updateMember(accData));
  };
  render() {
    const { loading, accounts } = this.props.data;
    const { isModalVisible, currentMember } = this.props;

    if (loading) {
      return <Loader />;
    }
    const initialFormValues = {
      email: currentMember.email,
      firstName: currentMember.profile ? currentMember.profile.firstName : '',
      lastName: currentMember.profile ? currentMember.profile.lastName : '',
      role: currentMember.roles ? currentMember.roles[0].id : '',
      username: currentMember.profile ? currentMember.profile.username : '',
      avatarUrl: currentMember.profile ? currentMember.profile.avatarUrl : '',
    };
    return (
      <Members
        toggleUser={this.toggleUser}
        accounts={accounts}
        visible={isModalVisible}
        close={this.closeModal}
        handleSubmit={this.handleSubmit}
        initialValues={initialFormValues}
      />
    );
  }
}

const mapStateToProps = state => {
  const modalSelector = makeSelectModal();
  const currentMemSelect = makeSelectCurrentMember();
  return {
    isModalVisible: modalSelector(state),
    currentMember: currentMemSelect(state),
  };
};
// $FlowIssue
const MembersContainerWithData = graphql(MEMBERS_QUERY, {
  // $FlowIssue
  options: () => ({
    variables: {
      offset: 0,
      limit: 20,
    },
  }),
  // $FlowIssue
})(MembersContainer);
// $FlowIssue
export default connect(mapStateToProps)(MembersContainerWithData);
