/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../state/modules/boldr/ui/actions';
import { loadSiteMembers, memberSelected, updateMember } from '../../../state/modules/admin/members/actions';
import Members from './Members';

type Props = {
  members: Object,
  dispatch: Function,
  memberSelected: Function,
  loadSiteMembers: Function,
  updateMember: Function,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};

export class MembersContainer extends Component {
  static fetchData(dispatch) {
    return Promise.all([dispatch(loadSiteMembers())]);
  }

  constructor(props: Props) {
    super(props);
    (this: any).toggleUser = this.toggleUser.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
    (this: any).closeModal = this.closeModal.bind(this);
    (this: any).openModal = this.openModal.bind(this);
  }
  state: Object = { userId: '' };

  componentDidMount() {
    const { dispatch } = this.props;
    MembersContainer.fetchData(dispatch);
  }
  props: Props;

  closeModal() {
    this.props.dispatch(hideModal());
  }
  openModal() {
    this.props.dispatch(showModal());
  }

  toggleUser(userId: String) {
    this.setState({ userId });
    this.props.dispatch(memberSelected(userId));
    this.props.dispatch(showModal());
  }

  handleSubmit(values: Object) {
    const userData = {
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      role: values.role,
      id: this.state.userId,
    };

    this.props.dispatch(updateMember(userData));
  }
  render() {
    return (
      <Members
        toggleUser={ this.toggleUser }
        users={ this.props.members.members }
        visible={ this.props.ui.modal }
        close={ this.closeModal }
        handleSubmit={ this.handleSubmit }
        initialValues={ this.props.members.selected[0] }
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
