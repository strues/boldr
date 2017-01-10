/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton } from 'material-ui/RadioButton';
import { RadioButtonGroup, TextField } from 'redux-form-material-ui';
import { Row, Col } from '../../../../../components/Layout';

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
const FileEditorForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
      <form onSubmit={ handleSubmit } className="boldr-form__fileeditor">
        <Field
          name="file_name"
          type="text"
          floatingLabelText="File name"
          component={ TextField }
        />
        <Field
          name="file_description"
          type="text"
          floatingLabelText="Description"
          component={ TextField }
        />
        <Row>
          <RaisedButton type="submit" label="Save" style={ style } primary />
          <FlatButton label="Reset" onClick={ reset } secondary />
        </Row>
      </form>
  );
};

export default reduxForm({
  form: 'fileEditorForm',
})(FileEditorForm);
