/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { TextField } from '../../../../../components/Form';
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
          label="File name"
          component={ TextField }
        />
        <Field
          name="file_description"
          type="text"
          label="Description"
          component={ TextField }
        />
        <Row>
          <Button type="submit" label="Save" style={ style } raised primary />
          <Button label="Reset" onClick={ reset } flat secondary />
        </Row>
      </form>
  );
};

export default reduxForm({
  form: 'fileEditorForm',
})(FileEditorForm);
