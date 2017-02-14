/* @flow */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import { InputField } from '../../../../components';

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

let CommentForm = (props: Props) => { // eslint-disable-line
  const { handleSubmit, reset } = props;
  return (
    <form className="boldr-form__comment" onSubmit={ handleSubmit }>
      <Field id="content" name="content" component={ InputField } type="text" label="Your comment" />

      <div className="form__footer">
        <Button type="submit" label="Save" style={ style } raised primary />
        <Button label="Reset" onClick={ reset } style={ style } raised secondary />
      </div>
    </form>
  );
};
CommentForm = reduxForm({
  form: 'newCommentForm',
})(CommentForm);

export default CommentForm;
