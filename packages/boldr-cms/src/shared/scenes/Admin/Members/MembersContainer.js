/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../state/modules/boldr/ui/actions';
import Members from './Members';
import { loadSiteMembers, memberSelected, updateMember } from './reducer';

type Props = {
  members: Object,
  memberSelected: Function,
  loadSiteMembers: Function,
  updateMember: Function,
  hideModal: () => void,
  showModal: () => void,
  ui: Object,
};
@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(loadSiteMembers());
  },
})
export class MembersContainer extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).toggleUser = this.toggleUser.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
    (this: any).closeModal = this.closeModal.bind(this);
    (this: any).openModal = this.openModal.bind(this);
  }
  state: Object = { userId: '' };

  componentDidMount() {
    this.props.loadSiteMembers();
  }
  props: Props;

  closeModal() {
    this.props.hideModal();
  }
  openModal() {
    this.props.showModal();
  }

  toggleUser(userId: String) {
    this.setState({ userId });
    this.props.memberSelected(userId);
    this.props.showModal();
  }

  handleSubmit(values: Object) {
    const userData = {
      display_name: values.display_name,
      first_name: values.first_name,
      last_name: values.last_name,
      role: values.role,
      id: this.state.userId,
    };
    console.log(userData)
    this.props.updateMember(userData);
  }
  render() {
    return (
         <Members
           toggleUser={ this.toggleUser }
           users={ this.props.members.members }
           open={ this.props.ui.modal }
           close={ this.closeModal }
           handleSubmit={ this.handleSubmit }
           initialValues={ this.props.members.selected[0] }
         />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    members: state.members,
    selected: state.members.selected,
    ui: state.boldr.ui,
  };
};

export default connect(mapStateToProps, {
  memberSelected, updateMember, loadSiteMembers, showModal, hideModal,
})(MembersContainer);
