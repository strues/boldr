/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@boldr/ui/Button';
import Headline from '@boldr/ui/Headline';
import Form, { TextFormField, FormField, Control } from '@boldr/ui/Form';

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
      <Field id="fname" name="firstName" component={TextFormField} type="text" label="First Name" />
      <Field id="lname" name="lastName" component={TextFormField} type="text" label="Last Name" />
      <Field id="loc" name="location" component={TextFormField} type="text" label="Location" />
      <Field id="web" name="website" component={TextFormField} type="text" label="Website" />
      <Field id="bio" name="bio" component={TextFormField} type="text" label="Bio" />
      <Headline type="h4">Social</Headline>
      <Field id="fb" name="facebook" component={TextFormField} type="text" label="Facebook" />
      <Field id="tw" name="twitter" component={TextFormField} type="text" label="Twitter" />
      <Field id="goog" name="google" component={TextFormField} type="text" label="Google" />
      <Field id="gh" name="github" component={TextFormField} type="text" label="Github" />
      <Field id="li" name="linkedin" component={TextFormField} type="text" label="LinkedIn" />
      <FormField isGroup>
        <Control>
          <Button htmlType="submit" kind="primary">
            Save
          </Button>
        </Control>
        <Control>
          <Button onClick={reset} kind="primary" outline>
            Reset
          </Button>
        </Control>
      </FormField>
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
