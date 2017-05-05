/* @flow */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'boldr-ui/lib/components/Button';
import { Form, InputField } from 'boldr-ui';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
  input: Object,
};
const UploadUrlForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__generic">
      <Field
        id="url"
        name="url"
        type="text"
        placeholder="URL of media to upload"
        label="URL"
        component={InputField}
      />

      <Button type="submit" style={style}>Upload</Button>
      <Button onClick={reset} style={style} theme="secondary">Reset</Button>
    </Form>
  );
};

export default reduxForm({
  form: 'uploadUrlForm',
})(UploadUrlForm);
