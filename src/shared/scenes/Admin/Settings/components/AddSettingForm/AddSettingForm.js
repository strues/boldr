import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

import { Row } from '../../../../../components/Layout';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

const AddSettingForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
      <form onSubmit={ handleSubmit } className="modal__form">
            <Field
              name="email"
              type="email"
              label="Email"
              component={ TextField }
            />
            <Field
              name="first_name"
              type="text"
              label="First name"
              component={ TextField }
            />
            <Field
              name="last_name"
              type="text"
              label="Last name"
              component={ TextField }
            />
            <Field
              name="last_name"
              type="text"
              label="Last name"
              component={ TextField }
            />
            <Field
              name="avatar_url"
              type="text"
              label="Avatar URL"
              component={ TextField }
            />
            <Row>
              <label htmlFor="member">
                <Field name="role" id="member" component="input" type="radio" value="1" />
                Member
              </label>
              <label htmlFor="staff">
                <Field name="role" id="staff" component="input" type="radio" value="2" />
                Staff
              </label>
              <label htmlFor="admin">
                <Field name="role" id="admin" component="input" type="radio" value="3" />
                Admin
              </label>
            </Row>
             <RaisedButton primary type="submit" label="Save changes" />
             <FlatButton onClick={ reset } label="Clear" />

        </form>
  );
};

export default reduxForm({
  form: 'addSettingForm',
})(AddSettingForm);
