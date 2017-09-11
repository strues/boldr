/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Helmet from 'react-helmet';
import Dialog from '@boldr/ui/Dialog';
import type { User } from '../../../types/boldr';

import { MembersList, EditMemberForm } from './components';

type Props = {
  visible: boolean,
  close: Function,
  initialValues: Object,
  users: Array<User>,
  toggleUser: Function,
  handleSubmit: Function,
};

const Members = (props: Props) => {
  const intialFormValues = {
    firstName: props.initialValues.profile.firstName,
    lastName: props.initialValues.profile.lastName,
    username: props.initialValues.profile.username,
    avatarUrl: props.initialValues.profile.avatarUrl,
    role: props.initialValues.role,
    email: props.initialValues.email,
  };
  return (
    <div>
      <Helmet title="Admin: Members" />
      <MembersList toggleUser={props.toggleUser} users={props.users} />
      <Dialog title="Edit User" visible={props.visible} onClose={props.close}>
        <EditMemberForm onSubmit={props.handleSubmit} initialValues={intialFormValues} />
      </Dialog>
    </div>
  );
};
export default Members;
