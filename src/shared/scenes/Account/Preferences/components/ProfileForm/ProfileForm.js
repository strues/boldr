/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField, Form } from '@@components/Form';
import Button from '@@components/Button';
import Headline from '@@components/Headline';

type Props = {
  handleSubmit: Function,
  pristine: Boolean,
  reset: Function,
  submitting: Boolean,
};

let ProfileForm = (props: Props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__profile">
      <Field id="fname" name="firstName" component={InputField} type="text" label="First Name" />
      <Field id="lname" name="lastName" component={InputField} type="text" label="Last Name" />
      <Field id="loc" name="location" component={InputField} type="text" label="Location" />
      <Field id="web" name="website" component={InputField} type="text" label="Website" />
      <Field id="bio" name="bio" component={InputField} type="text" label="Bio" />
      <Headline type="h4">Social</Headline>
      <Field id="fb" name="facebook" component={InputField} type="text" label="Facebook" />
      <Field id="tw" name="twitter" component={InputField} type="text" label="Twitter" />
      <Field id="goog" name="google" component={InputField} type="text" label="Google" />
      <Field id="gh" name="github" component={InputField} type="text" label="Github" />
      <Field id="li" name="linkedin" component={InputField} type="text" label="LinkedIn" />
      <div>
        <Button htmlType="submit" kind="primary">Save</Button>

        <Button onClick={reset} kind="primary">Reset</Button>
      </div>
    </Form>
  );
};

ProfileForm = reduxForm({
  form: 'profileForm',
})(ProfileForm);

ProfileForm = connect(state => ({
  initialValues: state.users.me,
}))(ProfileForm);

export default ProfileForm;
