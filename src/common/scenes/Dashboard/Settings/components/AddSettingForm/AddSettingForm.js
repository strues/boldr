export type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Button } from 'components/index';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

const AddSettingForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
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
             <Button submit>Save changes</Button>
             <Button disabled={ pristine || submitting } onClick={ reset }>Clear</Button>

        </form>
  );
};

export default reduxForm({
  form: 'addSettingForm',
})(AddSettingForm);
