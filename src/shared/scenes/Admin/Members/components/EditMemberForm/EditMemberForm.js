/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'boldr-ui/lib/components/Button';
import { Form, SelectField, InputField } from 'boldr-ui';

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
    name: 'Member',
  },
  {
    value: 2,
    name: 'Staff',
  },
  {
    value: 3,
    name: 'Admin',
  },
];
const EditMemberForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field
        id="email"
        name="email"
        type="email"
        label="Email"
        component={InputField}
      />
      <Field
        id="firstName"
        name="firstName"
        type="text"
        label="First name"
        component={InputField}
      />
      <Field
        id="lastName"
        name="lastName"
        type="text"
        label="Last name"
        component={InputField}
      />
      <Field
        id="username"
        name="username"
        type="text"
        label="Username"
        component={InputField}
      />
      <Field
        id="avatarUrl"
        name="avatarUrl"
        type="text"
        label="Avatar URL"
        component={InputField}
      />
      <Field name="role" component={SelectField} options={roles} />
      <Button type="submit" style={style}>Save</Button>
      <Button onClick={reset} style={style} theme="secondary">Reset</Button>
    </Form>
  );
};

export default reduxForm({
  form: 'editMemberForm',
})(EditMemberForm);
