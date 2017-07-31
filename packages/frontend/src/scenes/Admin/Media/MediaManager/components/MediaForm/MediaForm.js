/* @flow */

import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
// internal
import Button from '@boldr/ui/Button';
import { Form, TextFormField } from '@boldr/ui/Form';

const style = {
  margin: 12,
};
type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  pristine?: boolean,
};
const FormBottom = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

const MediaForm = (props: Props) => {
  const { handleSubmit, reset, submitting, pristine } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__fileeditor">
      <Field id="name" name="name" type="text" label="File name" component={TextFormField} />
      <Field
        id="description"
        name="fileDescription"
        type="text"
        label="Description"
        component={TextFormField}
      />
      <FormBottom>
        <Button htmlType="submit" kind="primary" style={style} disabled={submitting || pristine}>
          Save
        </Button>
        <Button onClick={reset} style={style} kind="secondary">
          Reset
        </Button>
      </FormBottom>
    </Form>
  );
};

export default reduxForm({
  form: 'mediaForm',
})(MediaForm);
