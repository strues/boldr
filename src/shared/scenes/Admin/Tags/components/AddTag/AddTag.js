/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'boldr-ui/lib/components/Button';
import { InputField, Form } from 'boldr-ui';

type Props = {
  handleSubmit?: Function,
  reset?: Function,
  submitting?: boolean,
  fields?: Object,
  pristine?: boolean,
};

const style = {
  margin: 12,
};

let AddTag = (props: Props) => {
  // eslint-disable-line
  const { handleSubmit, reset } = props;
  return (
    <Form className="boldr-form__addtag" onSubmit={handleSubmit}>
      <Field
        id="tag-name"
        name="name"
        component={InputField}
        type="text"
        label="Name"
      />
      <Field
        id="tag-description"
        name="description"
        component={InputField}
        type="text"
        label="Description"
      />

      <div className="form__footer">
        <Button type="submit" style={style}>Save</Button>
        <Button onClick={reset} style={style} theme="secondary">Reset</Button>
      </div>
    </Form>
  );
};
AddTag = reduxForm({
  form: 'addTagForm',
})(AddTag);

export default AddTag;
