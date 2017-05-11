/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import { InputField, Row, Form } from 'boldr-ui';

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
    <Form onSubmit={handleSubmit} className="boldr-form__fileeditor">
      <Field
        id="name"
        name="fileName"
        type="text"
        label="File name"
        component={InputField}
      />
      <Field
        id="description"
        name="fileDescription"
        type="text"
        label="Description"
        component={InputField}
      />
      <Row>
        <FlatButton type="submit" label="Save" style={style} primary />
        <FlatButton label="Reset" onTouchTap={reset} style={style} secondary />
      </Row>
    </Form>
  );
};

export default reduxForm({
  form: 'fileEditorForm',
})(FileEditorForm);
