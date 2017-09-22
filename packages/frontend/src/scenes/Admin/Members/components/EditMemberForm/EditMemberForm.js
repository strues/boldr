/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@boldr/ui/Button';
import { Form, FormField, Control, TextFormField, SelectFormField } from '@boldr/ui/Form';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
  input: Object,
};
const roles = [
  {
    value: 1,
    text: 'Member',
  },
  {
    value: 2,
    text: 'Staff',
  },
  {
    value: 3,
    text: 'Admin',
  },
];
const EditMemberForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field id="email" name="email" type="email" label="Email" component={TextFormField} />
      <Field
        id="firstName"
        name="firstName"
        type="text"
        label="First name"
        component={TextFormField}
      />
      <Field
        id="lastName"
        name="lastName"
        type="text"
        label="Last name"
        component={TextFormField}
      />
      <Field id="username" name="username" type="text" label="Username" component={TextFormField} />
      <Field
        id="avatarUrl"
        name="avatarUrl"
        type="text"
        label="Avatar URL"
        component={TextFormField}
      />
      <Field
        id="user-role"
        name="role"
        type="select"
        component={SelectFormField}
        label="Role"
        options={roles}
      />
      <FormField isGrouped>
        <Control>
          <Button htmlType="submit" style={style} kind="primary">
            Save
          </Button>
        </Control>
        <Control>
          <Button onClick={reset} style={style} kind="secondary">
            Reset
          </Button>
        </Control>
      </FormField>
    </Form>
  );
};

export default reduxForm({
  form: 'editMemberForm',
})(EditMemberForm);
