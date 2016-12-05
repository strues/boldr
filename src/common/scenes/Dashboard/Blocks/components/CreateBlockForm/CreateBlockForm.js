/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

type Props = {
  handleSubmit: () => void,
  reset: () => void,
}

const style = {
  margin: 12,
};

const CreateBlockForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
    <form onSubmit={ handleSubmit } className="modal__form">
      <Field
        name="name"
        type="text"
        floatingLabelText="Name"
        component={ TextField }
      />
      <Field
        name="element"
        type="text"
        floatingLabelText="Element"
        component={ SelectField }
      >
        <MenuItem value="Header" primaryText="Header" />
        <MenuItem value="Footer" primaryText="Footer" />
        <MenuItem value="Text" primaryText="Text" />
        <MenuItem value="Hero" primaryText="Hero" />
      </Field>
      <RaisedButton type="submit" label="Save" style={ style } primary />
      <FlatButton label="Reset" onClick={ reset } secondary />
    </form>
  );
};

export default reduxForm({
  form: 'createBlockform',
})(CreateBlockForm);
