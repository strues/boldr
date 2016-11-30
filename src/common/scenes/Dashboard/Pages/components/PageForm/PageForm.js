import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { Row, Button } from 'components/index';

const PageForm = (props) => {
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
          name="name"
          type="text"
          label="Name"
          component={ renderField }
        />
        <Field
          name="url"
          type="text"
          label="URL"
          component={ renderField }
        />

     <Button submit>Save changes</Button>
     <Button disabled={ pristine || submitting } onClick={ reset }>Clear</Button>
    </Form>
  );
};

PageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  fields: PropTypes.object,
  pristine: PropTypes.bool,
};

export default reduxForm({
  form: 'pageForm',
})(PageForm);
