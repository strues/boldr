/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup, TextField } from 'redux-form-material-ui';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};
const EditMemberForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
      <form onSubmit={ handleSubmit } className="modal__form">
        <Field
          name="email"
          type="email"
          floatingLabelText="Email"
          component={ TextField }
        />
        <Field
          name="first_name"
          type="text"
          floatingLabelText="First name"
          component={ TextField }
        />
        <Field
          name="last_name"
          type="text"
          floatingLabelText="Last name"
          component={ TextField }
        />
        <Field
          name="last_name"
          type="text"
          floatingLabelText="Last name"
          component={ TextField }
        />
        <Field
          name="avatar_url"
          type="text"
          floatingLabelText="Avatar URL"
          component={ TextField }
        />
        <Field name="role" component={ RadioButtonGroup }>
          <RadioButton value="1" label="Member" />
          <RadioButton value="2" label="Staff" />
          <RadioButton value="3" label="Admin" />
        </Field>
        <RaisedButton type="submit" label="Save" style={ style } primary />
        <FlatButton label="Reset" onClick={ reset } secondary />
      </form>
  );
};

export default reduxForm({
  form: 'editMemberForm',
})(EditMemberForm);
