/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@@components/Button';
import Select from '@@components/Select';
import { SelectInput, Form, InputField } from '@@components/Form';

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
      <Field id="email" name="email" type="email" label="Email" component={InputField} />
      <Field
        id="firstName"
        name="firstName"
        type="text"
        label="First name"
        component={InputField}
      />
      <Field id="lastName" name="lastName" type="text" label="Last name" component={InputField} />
      <Field id="username" name="username" type="text" label="Username" component={InputField} />
      <Field
        id="avatarUrl"
        name="avatarUrl"
        type="text"
        label="Avatar URL"
        component={InputField}
      />
      <Field name="role" component={SelectInput} options={roles} />
      <Button htmlType="submit" style={style} kind="primary">Save</Button>
      <Button onClick={reset} style={style} kind="secondary">Reset</Button>
    </Form>
  );
};

export default reduxForm({
  form: 'editMemberForm',
})(EditMemberForm);
