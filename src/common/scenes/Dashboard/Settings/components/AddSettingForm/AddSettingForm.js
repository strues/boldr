export type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { Row, Button } from 'components/index';

const AddSettingForm = (props) => {
  const renderField = ({ input, label, type, meta: { touched, error } }) => ( // eslint-disable-line
    <Form.Input
      label={ label }
      className="form__auth"
      type={ type }
      { ...input }
    />
  );

  const { handleSubmit, pristine, reset, submitting } = props;
  return (
      <Form onSubmit={ handleSubmit } className="modal__form">
            <Field
              name="email"
              type="email"
              label="Email"
              component={ renderField }
            />
            <Field
              name="first_name"
              type="text"
              label="First name"
              component={ renderField }
            />
            <Field
              name="last_name"
              type="text"
              label="Last name"
              component={ renderField }
            />
            <Field
              name="last_name"
              type="text"
              label="Last name"
              component={ renderField }
            />
            <Field
              name="avatar_url"
              type="text"
              label="Avatar URL"
              component={ renderField }
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

        </Form>
  );
};

export default reduxForm({
  form: 'addSettingForm',
})(AddSettingForm);
