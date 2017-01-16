import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};
const PageForm = (props: Props) => {
  const { handleSubmit, reset } = props;
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

     <RaisedButton type="submit" label="Save Changes" primary />
     <FlatButton label="Clear" onClick={ reset } />
   </form>
  );
};

export default reduxForm({
  form: 'pageForm',
})(PageForm);
