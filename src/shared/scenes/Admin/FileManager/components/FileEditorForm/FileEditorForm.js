/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
// internal
import Button from '~components/Button';
import { InputField, Row, Form } from '~components';

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
      <Field id="name" name="fileName" type="text" label="File name" component={InputField} />
      <Field
        id="description"
        name="fileDescription"
        type="text"
        label="Description"
        component={InputField}
      />
      <Row>
        <Button htmlType="submit" style={style} kind="primary">Save</Button>
        <Button onClick={reset} style={style} kind="secondary">Reset</Button>
      </Row>
    </Form>
  );
};

export default reduxForm({
  form: 'fileEditorForm',
})(FileEditorForm);
