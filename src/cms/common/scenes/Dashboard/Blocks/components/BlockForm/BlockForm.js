import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';

const BlockForm = (props) => {
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

             <Button primary type="submit">Login</Button>
             <Button disabled={ pristine || submitting } onClick={ reset }>Clear</Button>

        </Form>
  );
};

export default reduxForm({
  form: 'blockform',
})(BlockForm);
