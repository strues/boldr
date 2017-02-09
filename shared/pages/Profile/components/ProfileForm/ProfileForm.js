/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { TextField, FormGroup } from '../../../../components/Form';

type Props = {
  handleSubmit: Function,
  pristine: Boolean,
  reset: Function,
  submitting: Boolean,
};

const ProfileForm = (props: Props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <Field id="fname" name="first_name" component={ TextField } type="text" label="First Name" />
      <Field id="lname" name="last_name" component={ TextField } type="text" label="Last Name" />
      <Field id="loc" name="location" component={ TextField } type="text" label="Location" />
      <Field id="web" name="website" component={ TextField } type="text" label="Website" />
      <Field id="bio" name="bio" component={ TextField } type="text" label="Bio" />

      <div>
        <Button raised primary type="submit" disabled={ pristine || submitting } label="Submit" />
        <Button flat secondary disabled={ pristine || submitting } onClick={ reset } label="Clear Values" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'profileForm',
})(ProfileForm);
