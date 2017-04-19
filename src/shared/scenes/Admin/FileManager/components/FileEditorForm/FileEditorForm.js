/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, InputField, Row, Col } from 'boldr-ui';

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
    <form onSubmit={handleSubmit} className="boldr-form__fileeditor">
      <Field
        id="name"
        name="file_name"
        type="text"
        label="File name"
        component={InputField}
      />
      <Field
        id="description"
        name="file_description"
        type="text"
        label="Description"
        component={InputField}
      />
      <Row>
        <Button type="submit" label="Save" style={style} raised primary />
        <Button label="Reset" onClick={reset} style={style} flat secondary />
      </Row>
    </form>
  );
};

export default reduxForm({
  form: 'fileEditorForm',
})(FileEditorForm);
