/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import SelectField from 'react-md/lib/SelectFields';
import InputField from '../../../../../components/Form/InputField';

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
    label: 'Member',
  },
  {
    value: 2,
    label: 'Staff',
  },
  {
    value: 3,
    label: 'Admin',
  },
];
type Prop = {
  input: Object,
};
const renderRoleSelector = (props: Prop) => (
  <div>
    <SelectField
      { ...props.input }
      id="roles"
      label="Role"
      placeholder="Select a role"
      menuItems={ roles }
      itemLabel="label"
      itemValue="value"
      className="md-cell"
    />
  </div>
);
const EditMemberForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
    <form onSubmit={ handleSubmit } className="boldr-form__generic">
      <Field id="email" name="email" type="email" label="Email" component={ InputField } />
      <Field id="firstName" name="firstName" type="text" label="First name" component={ InputField } />
      <Field id="lastName" name="lastName" type="text" label="Last name" component={ InputField } />
      <Field id="username" name="username" type="text" label="Username" component={ InputField } />
      <Field id="avatarUrl" name="avatarUrl" type="text" label="Avatar URL" component={ InputField } />
      <Field name="role" component={ renderRoleSelector } />
      <Button type="submit" label="Save" style={ style } raised primary />
      <Button label="Reset" onClick={ reset } style={ style } flat secondary />
    </form>
  );
};

export default reduxForm({
  form: 'editMemberForm',
})(EditMemberForm);
