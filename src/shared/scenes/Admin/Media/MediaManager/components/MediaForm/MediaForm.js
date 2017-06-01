/* @flow */

import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import Button from '~components/Button';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TextField, Form } from 'boldr-ui';

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
const FormBottom = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

const MediaForm = (props: Props) => {
  const { handleSubmit, reset } = props;
  return (
    <Form onSubmit={handleSubmit} className="boldr-form__fileeditor">
      <Field
        id="name"
        name="fileName"
        type="text"
        floatingLabelText="File name"
        fullWidth
        component={TextField}
      />
      <Field
        id="description"
        name="fileDescription"
        type="text"
        fullWidth
        floatingLabelText="Description"
        component={TextField}
      />
      <FormBottom>
        <Button type="submit" kind="primary" style={style}>Save</Button>
        <Button onClick={reset} style={style} kind="secondary">Reset</Button>
      </FormBottom>
    </Form>
  );
};

export default reduxForm({
  form: 'mediaForm',
})(MediaForm);
