/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from '../../../state/modules/boldr/ui/actions';
import {
  fetchMembersIfNeeded,
  memberSelected,
  updateMember,
} from '../../../state/modules/admin/members/actions';
import Members from './Members';

type Props = {
  members: Object,
  dispatch: Function,
  memberSelected: Function,
  fetchMembersIfNeeded: () => {},
  updateMember: Function,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};

export class MembersContainer extends Component {
  static defaultProps: {
    profile: {},
    fetchMembersIfNeeded: () => {},
  };
  constructor(props: Props) {
    super(props);
    (this: any).toggleUser = this.toggleUser.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
    (this: any).closeModal = this.closeModal.bind(this);
    (this: any).openModal = this.openModal.bind(this);
  }
  state: Object = { userId: '' };

  componentDidMount() {
    this.props.dispatch(fetchMembersIfNeeded());
  }
  props: Props;

  closeModal() {
    this.props.dispatch(hideModal());
  }
  openModal() {
    this.props.dispatch(showModal());
  }

  toggleUser(userId: String) {
    const { dispatch } = this.props;
    dispatch(memberSelected(userId));
    dispatch(showModal());
  }

  handleSubmit(values: Object) {
    const userData = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      id: this.props.members.selected[0].id,
    };

    this.props.dispatch(updateMember(userData));
  }
  render() {
    const { members, ui } = this.props;
    return (
      <Members
        toggleUser={this.toggleUser}
        users={members.members}
        visible={ui.modal}
        close={this.closeModal}
        handleSubmit={this.handleSubmit}
        initialValues={members.selected[0]}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    members: state.admin.members,
    selected: state.admin.members.selected,
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps)(MembersContainer);
