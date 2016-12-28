/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Modal } from '../../../components/index';
import { showModal, hideModal } from '../../../state/modules/boldr/ui/actions';
import { MembersList, EditMemberForm } from './components';
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
export class Members extends Component {
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

  toggleUser(userId) {
    this.setState({ userId });
    this.props.memberSelected(userId);
    this.props.showModal();
  }

  handleSubmit(values) {
    const userData = {
      display_name: values.display_name,
      first_name: values.first_name,
      last_name: values.last_name,
      role: values.role,
      id: this.state.userId,
    };

    this.props.updateMember(userData);
  }
  render() {
    return (
       <div>
         <MembersList toggleUser={ this.toggleUser } users={ this.props.members.members } />
         <Modal
           open={ this.props.ui.modal }
           title="Edit User"
           onClose={ this.closeModal }
         >
          <EditMemberForm onSubmit={ this.handleSubmit } initialValues={ this.props.members.selected[0] } />
          </Modal>
       </div>
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
})(Members);
