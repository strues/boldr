/* @flow */
import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-md/lib/Buttons';
import FieldEditor from '../../../Admin/Post/NewPost/components/NewPostForm/FieldEditor';
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
const Wrapper = styled.div`
  padding: 1em;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .4);
  background-color: #fff;
`;
let CommentForm = (props: Props) => { // eslint-disable-line
  const { handleSubmit, reset } = props;
  return (
    <Wrapper>
    <form className="boldr-form__comment" onSubmit={ handleSubmit }>
      <Field id="content" name="content" component={ FieldEditor } type="text" label="Your comment" />

      <div className="form__footer">
        <Button type="submit" label="Save" style={ style } raised primary />
        <Button label="Reset" onClick={ reset } style={ style } raised secondary />
      </div>
    </form>
  </Wrapper>
  );
};
CommentForm = reduxForm({
  form: 'newCommentForm',
})(CommentForm);

export default CommentForm;
