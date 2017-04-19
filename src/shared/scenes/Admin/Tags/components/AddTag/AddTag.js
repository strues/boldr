/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, InputField } from 'boldr-ui';

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
    <form className="boldr-form__addtag" onSubmit={handleSubmit}>
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
        <Button type="submit" label="Save" style={style} raised primary />
        <Button label="Reset" onClick={reset} style={style} raised secondary />
      </div>
    </form>
  );
};
AddTag = reduxForm({
  form: 'addTagForm',
})(AddTag);

export default AddTag;
