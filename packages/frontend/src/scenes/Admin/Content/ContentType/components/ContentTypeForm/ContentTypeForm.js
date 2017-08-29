/* @flow */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';

import Button from '@boldr/ui/Button';
import Form, { TextFormField } from '@boldr/ui/Form';
import validations from '../../../../../../core/util/validations';

type Props = {
  handleSubmit: Function,
  submitting?: boolean,
  pristine?: boolean,
  reset: () => void,
};

const FormBottom = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

const ContentTypeForm = (props: Props) => {
  const { handleSubmit, submitting, pristine, reset } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        id="name"
        name="name"
        type="text"
        component={TextFormField}
        label="Name"
        placeholder="Article"
        validate={[validations.isRequired]}
      />
      <Field
        id="icon"
        name="icon"
        type="text"
        component={TextFormField}
        label="Icon"
        placeholder="Icon name"
      />
      <Field
        id="icon"
        name="description"
        type="text"
        component={TextFormField}
        label="Description"
        placeholder="Summary of the content type"
      />

      <FormBottom>
        <Button htmlType="submit" kind="primary" disabled={submitting}>
          Save
        </Button>
        <Button
          onClick={reset}
          htmlType="reset"
          kind="primary"
          disabled={submitting || pristine}
          outline>
          Reset
        </Button>
      </FormBottom>
    </Form>
  );
};

export default reduxForm({
  form: 'contentTypeForm',
})(ContentTypeForm);
