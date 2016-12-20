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

const PageForm = (props) => {

  const { handleSubmit, pristine, reset, submitting } = props;
  return (
      <form onSubmit={ handleSubmit } className="page__form">
        <Field
          name="name"
          type="text"
          floatingLabelText="Name"
          component={ TextField }
        />
        <Field
          name="url"
          type="text"
          floatingLabelText="URL"
          component={ TextField }
        />

     <Button submit>Save changes</Button>
     <Button disabled={ pristine || submitting } onClick={ reset }>Clear</Button>
   </form>
  );
};

export default reduxForm({
  form: 'pageForm',
})(PageForm);
